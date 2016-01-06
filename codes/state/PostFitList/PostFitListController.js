(function() {
  'use strict';
  angular.module('app')
    .controller('PostFitListController', PostFitListController);

  PostFitListController.$inject = [
    '$scope', '$q', '$ionicScrollDelegate',
    'PostFitListModel', 'U', 'Post', 'Preload', 'Locations'
  ];

  function PostFitListController(
    $scope, $q, $ionicScrollDelegate,
    PostFitListModel, U, Post, Preload, Locations
  ) {
    var PostFitList = this;
    PostFitList.Model = PostFitListModel;
    var noLoadingStates = [];

    PostFitList.Locations = Locations;
    PostFitList.Location = PostFitList.Locations[0];
    PostFitList.loadMore = loadMore;

    $scope.$on('$ionicView.beforeEnter', onBeforeEnter);
    $scope.$on('$ionicView.afterEnter', onAfterEnter);

    //====================================================
    // Initial Loading of a state;
    //====================================================
    function onBeforeEnter() {
      if (!U.areSiblingViews(noLoadingStates)) {
        PostFitListModel.posts = [];
        $ionicScrollDelegate.scrollTop(false);
        PostFitListModel.loading = true;
      }
    }

    function onAfterEnter() {
      if (!U.areSiblingViews(noLoadingStates)) {
        return find()
          .then(function(postsWrapper) {
            console.log(postsWrapper);
            U.bindData(postsWrapper, PostFitListModel, 'posts');
          })
          .catch(U.error);
      }
    }

    function loadMore() {
      var last = PostFitListModel.posts.length - 1;
      return find({
          olderThan: PostFitListModel.posts[last].id
        })
        .then(function(postsWrapper) {
          U.appendData(postsWrapper, PostFitListModel, 'posts');
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
