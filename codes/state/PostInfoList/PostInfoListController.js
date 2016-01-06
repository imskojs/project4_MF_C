(function() {
  'use strict';
  angular.module('app')
    .controller('PostInfoListController', PostInfoListController);

  PostInfoListController.$inject = [
    '$scope', '$q', '$ionicScrollDelegate',
    'PostInfoListModel', 'U', 'Post', 'Preload', 'Infos'
  ];

  function PostInfoListController(
    $scope, $q, $ionicScrollDelegate,
    PostInfoListModel, U, Post, Preload, Infos
  ) {
    var PostInfoList = this;
    PostInfoList.Model = PostInfoListModel;
    var noLoadingStates = [];

    PostInfoList.Infos = Infos;
    PostInfoList.Info = PostInfoList.Infos[0];

    PostInfoList.loadMore = loadMore;

    $scope.$on('$ionicView.beforeEnter', onBeforeEnter);
    $scope.$on('$ionicView.afterEnter', onAfterEnter);

    //====================================================
    // Initial Loading of a state;
    //====================================================
    function onBeforeEnter() {
      if (!U.areSiblingViews(noLoadingStates)) {
        PostInfoListModel.posts = [];
        $ionicScrollDelegate.scrollTop(false);
        PostInfoListModel.loading = true;
      }
    }

    function onAfterEnter() {
      if (!U.areSiblingViews(noLoadingStates)) {
        return find()
          .then(function(postsWrapper) {
            console.log(postsWrapper);
            U.bindData(postsWrapper, PostInfoListModel, 'posts');
          })
          .catch(U.error);
      }
    }

    function loadMore() {
      var last = PostInfoListModel.posts.length - 1;
      return find({
          olderThan: PostInfoListModel.posts[last].id
        })
        .then(function(postsWrapper) {
          U.appendData(postsWrapper, PostInfoListModel, 'posts');
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
          category: 'InfoNESS_TOGETHER',
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
