(function() {
  'use strict';
  angular.module('app')
    .controller('PostQuestionListController', PostQuestionListController);

  PostQuestionListController.$inject = [
    '$scope', '$q', '$ionicScrollDelegate',
    'PostQuestionListModel', 'U', 'Post'
  ];

  function PostQuestionListController(
    $scope, $q, $ionicScrollDelegate,
    PostQuestionListModel, U, Post
  ) {
    var PostQuestionList = this;
    PostQuestionList.Model = PostQuestionListModel;
    var noLoadingStates = [];

    PostQuestionList.loadMore = loadMore;

    $scope.$on('$ionicView.beforeEnter', onBeforeEnter);
    $scope.$on('$ionicView.afterEnter', onAfterEnter);

    //====================================================
    // Initial Loading of a state;
    //====================================================
    function onBeforeEnter() {
      if (!U.areSiblingViews(noLoadingStates)) {
        $ionicScrollDelegate.scrollTop(false);
        PostQuestionListModel.loading = true;
      }
    }

    function onAfterEnter() {
      if (!U.areSiblingViews(noLoadingStates)) {
        return find()
          .then(function(postsWrapper) {
            console.log("---------- postsWrapper ----------");
            console.log(postsWrapper);
            U.bindData(postsWrapper, PostQuestionListModel, 'posts');
          })
          .catch(U.error);
      }
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
        .catch(U.error)
        .finally(function() {
          U.broadcast($scope);
        });
    }
    //====================================================
    //  Implementations
    //====================================================
    function find(extraQuery) {
      var queryWrapper = {
        query: {
          category: 'FITNESS_TOGETHER',
          limit: 20,
          sort: 'id DESC',
          populates: ['createdBy']
        }
      };
      angular.extend(queryWrapper.query, extraQuery);
      return Post.find(queryWrapper).$promise
        .then(function(postsWrapper) {
          console.log("---------- postsWrapper ----------");
          console.log(postsWrapper);
          return postsWrapper;
        });
    }

  }
})();
