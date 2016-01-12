(function() {
  'use strict';
  angular.module('app')
    .controller('PostFitListController', PostFitListController);

  PostFitListController.$inject = [
    '$scope', '$q', '$ionicScrollDelegate', '$ionicHistory',
    'PostFitListModel', 'U', 'Post', 'PostFitModel', 'Preload'
  ];

  function PostFitListController(
    $scope, $q, $ionicScrollDelegate, $ionicHistory,
    PostFitListModel, U, Post, PostFitModel, Preload
  ) {
    var PostFitList = this;
    PostFitList.Model = PostFitListModel;
    var initPromise;
    var noLoadingStates = [
      'Main.PostFitDetail'
    ];

    PostFitList.loadMore = loadMore;
    PostFitList.refresh = refresh;

    $scope.$on('$ionicView.beforeEnter', onBeforeEnter);
    $scope.$on('$ionicView.afterEnter', onAfterEnter);
    $scope.$on('PostFit:LocationChanged', function() {
      U.loading(PostFitListModel);
      return init()
        .then(function(postsWrapper) {
          console.log("---------- postsWrapper ----------");
          console.log(postsWrapper);
          U.bindData(postsWrapper, PostFitListModel, 'posts');
        })
        .catch(function(err) {
          U.error(err);
        });
    });

    //====================================================
    // Initial Loading of a state;
    //====================================================
    function onBeforeEnter() {
      if (!U.hasPreviousStates(noLoadingStates)) {
        U.loading(PostFitListModel);
        initPromise = init();
      }
    }

    function onAfterEnter() {
      if (!U.hasPreviousStates(noLoadingStates)) {
        return initPromise
          .then(function(postsWrapper) {
            console.log("---------- postsWrapper ----------");
            console.log(postsWrapper);
            U.bindData(postsWrapper, PostFitListModel, 'posts');
          })
          .catch(function(err) {
            U.error(err);
          });
      } else {
        U.freeze(false);
      }
    }

    function refresh() {
      return init()
        .then(function(postsWrapper) {
          console.log("---------- postsWrapper ----------");
          console.log(postsWrapper);
          U.bindData(postsWrapper, PostFitListModel, 'posts');
        })
        .catch(function(err) {
          U.error(err);
        })
        .finally(function() {
          U.broadcast($scope);
        });
    }

    function loadMore() {
      var last = PostFitListModel.posts.length - 1;
      return find({
          id: {
            '<': PostFitListModel.posts[last].id
          }
        })
        .then(function(postsWrapper) {
          U.appendData(postsWrapper, PostFitListModel, 'posts');
        })
        .catch(function(err) {
          U.error(err);
        })
        .finally(function() {
          U.broadcast($scope);
        });
    }

    //====================================================
    //  Helper
    //====================================================

    function init() {
      return find();
    }

    //====================================================
    // REST
    //====================================================
    function find(extraQuery, extraOperation) {
      var queryWrapper = {
        query: {
          where: {
            category: 'TOGETHER-POST',
            location: PostFitModel.Location.name
          },
          limit: 20,
          sort: 'createdAt DESC',
          populates: ['createdBy']
        }
      };
      angular.extend(queryWrapper.query.where, extraQuery);
      angular.extend(queryWrapper.query, extraOperation);
      return Post.find(queryWrapper).$promise
        .then(function(postsWrapper) {
          var photosPromise = Preload.photos(postsWrapper.posts, 'Cloudinary600', true, 'neverMind');
          return $q.all([postsWrapper, photosPromise]);
        })
        .then(function(array) {
          var postsWrapper = array[0];
          return postsWrapper;
        });
    }

  }
})();
