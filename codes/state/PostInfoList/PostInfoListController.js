(function() {
  'use strict';
  angular.module('app')
    .controller('PostInfoListController', PostInfoListController);

  PostInfoListController.$inject = [
    '$scope', '$q', '$ionicScrollDelegate',
    'PostInfoListModel', 'U', 'Post', 'Preload', 'PostInfoModel'
  ];

  function PostInfoListController(
    $scope, $q, $ionicScrollDelegate,
    PostInfoListModel, U, Post, Preload, PostInfoModel
  ) {
    var PostInfoList = this;
    PostInfoList.Model = PostInfoListModel;
    var initPromise;
    var noLoadingStates = [
      'Main.PostInfoDetail'
    ];

    PostInfoList.loadMore = loadMore;
    PostInfoList.refresh = refresh;

    $scope.$on('$ionicView.beforeEnter', onBeforeEnter);
    $scope.$on('$ionicView.afterEnter', onAfterEnter);
    $scope.$on('PostInfo:InfoChanged', function() {
      U.loading(PostInfoListModel);
      return init()
        .then(function(postsWrapper) {
          console.log("---------- postsWrapper ----------");
          console.log(postsWrapper);
          U.bindData(postsWrapper, PostInfoListModel, 'posts');
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
        U.loading(PostInfoListModel);
        initPromise = init();
      }
    }

    function onAfterEnter() {
      if (!U.hasPreviousStates(noLoadingStates)) {
        return initPromise
          .then(function(postsWrapper) {
            console.log("---------- postsWrapper ----------");
            console.log(postsWrapper);
            U.bindData(postsWrapper, PostInfoListModel, 'posts');
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
          U.bindData(postsWrapper, PostInfoListModel, 'posts');
        })
        .catch(function(err) {
          U.error(err);
        })
        .finally(function() {
          U.broadcast($scope);
        });
    }

    function loadMore() {
      var last = PostInfoListModel.posts.length - 1;
      return find({
          id: {
            '<': PostInfoListModel.posts[last].id
          }
        })
        .then(function(postsWrapper) {
          U.appendData(postsWrapper, PostInfoListModel, 'posts');
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
    //  REST
    //====================================================
    function find(extraQuery, extraOperation) {
      var queryWrapper = {
        query: {
          where: {
            category: 'INFO-POST',
            fitnessType: PostInfoModel.Info.name
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
          var photosPromise = Preload.photos(postsWrapper.posts, 'Clouinary600', true, 'neverMind');
          return $q.all([postsWrapper, photosPromise]);
        })
        .then(function(array) {
          var postsWrapper = array[0];
          return postsWrapper;
        });
    }

  }
})();
