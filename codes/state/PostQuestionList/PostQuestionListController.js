(function() {
  'use strict';
  angular.module('app')
    .controller('PostQuestionListController', PostQuestionListController);

  PostQuestionListController.$inject = [
    '$scope', '$q', '$ionicScrollDelegate',
    'PostQuestionListModel', 'U', 'Post', 'Preload'
  ];

  function PostQuestionListController(
    $scope, $q, $ionicScrollDelegate,
    PostQuestionListModel, U, Post, Preload
  ) {
    var PostQuestionList = this;
    PostQuestionList.Model = PostQuestionListModel;
    var initPromise;
    var noLoadingStates = [
      'Main.PostQuestionDetail'
    ];

    PostQuestionList.loadMore = loadMore;
    PostQuestionList.refresh = refresh;

    $scope.$on('$ionicView.beforeEnter', onBeforeEnter);
    $scope.$on('$ionicView.afterEnter', onAfterEnter);

    //====================================================
    // Initial Loading of a state;
    //====================================================
    function onBeforeEnter() {
      if (!U.hasPreviousStates(noLoadingStates)) {
        U.loading(PostQuestionListModel);
        initPromise = init();
      }
    }

    function onAfterEnter() {
      if (!U.hasPreviousStates(noLoadingStates)) {
        return initPromise
          .then(function(postsWrapper) {
            console.log("---------- postsWrapper ----------");
            console.log(postsWrapper);
            U.bindData(postsWrapper, PostQuestionListModel, 'posts');
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
          U.bindData(postsWrapper, PostQuestionListModel, 'posts');
        })
        .catch(function(err) {
          U.error(err);
        })
        .finally(function() {
          U.broadcast($scope);
        });
    }

    function loadMore() {
      var last = PostQuestionListModel.posts.length - 1;
      return find({
          id: {
            '<': PostQuestionListModel.posts[last].id
          }
        })
        .then(function(postsWrapper) {
          U.appendData(postsWrapper, PostQuestionListModel, 'posts');
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
            category: 'QUESTION-POST'
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
