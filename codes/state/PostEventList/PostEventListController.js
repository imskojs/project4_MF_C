(function() {
  'use strict';
  angular.module('app')
    .controller('PostEventListController', PostEventListController);

  PostEventListController.$inject = [
    '$scope', '$q', '$ionicScrollDelegate',
    'PostEventListModel', 'U', 'Post', 'Preload'
  ];

  function PostEventListController(
    $scope, $q, $ionicScrollDelegate,
    PostEventListModel, U, Post, Preload
  ) {
    var PostEventList = this;
    PostEventList.Model = PostEventListModel;
    var noLoadingStates = [];

    PostEventList.loadMore = loadMore;

    $scope.$on('$ionicView.beforeEnter', onBeforeEnter);
    $scope.$on('$ionicView.afterEnter', onAfterEnter);

    //====================================================
    // Initial Loading of a state;
    //====================================================
    function onBeforeEnter() {
      if (!U.areSiblingViews(noLoadingStates)) {
        PostEventListModel.posts = [];
        $ionicScrollDelegate.scrollTop(false);
        PostEventListModel.loading = true;
      }
    }

    function onAfterEnter() {
      if (!U.areSiblingViews(noLoadingStates)) {
        return find()
          .then(function(postsWrapper) {
            console.log(postsWrapper);
            U.bindData(postsWrapper, PostEventListModel, 'posts');
          })
          .catch(U.error);
      }
    }

    function loadMore() {
      var last = PostEventListModel.posts.length - 1;
      return find({
          olderThan: PostEventListModel.posts[last].id
        })
        .then(function(postsWrapper) {
          U.appendData(postsWrapper, PostEventListModel, 'posts');
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
          return postsWrapper;
        })
    }

  }
})();
