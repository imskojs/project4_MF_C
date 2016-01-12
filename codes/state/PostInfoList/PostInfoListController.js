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
    var noLoadingStates = [
      'Main.PostInfoDetail'
    ];

    PostInfoList.loadMore = loadMore;
    PostInfoList.refresh = refresh;

    $scope.$on('$ionicView.beforeEnter', onBeforeEnter);
    $scope.$on('$ionicView.afterEnter', onAfterEnter);
    $scope.$on('$ionicView.beforeLeave', onBeforeLeave);
    $scope.$on('PostInfo:InfoChanged', function(){
      U.loading(PostInfoModel);
      loadPost();
    });

    //====================================================
    // Initial Loading of a state;
    //====================================================
    function onBeforeEnter() {
      if (!U.hasPreviousStates(noLoadingStates)) {
        U.loading(PostInfoListModel);
      }
    }

    function onAfterEnter() {
      if (!U.hasPreviousStates(noLoadingStates)) {
        return loadPost();
      }
    }

    function onBeforeLeave(){
      U.resetSlides();
    }

    function refresh(){
      loadPost();
    }

    function loadMore() {
      var last = PostInfoListModel.posts.length - 1;
      return loadPost({
        id: {
          '<': PostInfoListModel.posts[last].id
        }
      }, null, true /*appendData*/ );
    }

    //====================================================
    //  Helper
    //====================================================

    function loadPost(extraQuery, extraOpertaion, appendTrue) {
      return find(extraQuery)
        .then(function(postsWrapper) {
          console.log("---------- postsWrapper ----------");
          console.log(postsWrapper);
          if (appendTrue) {
            U.appendData(postsWrapper, PostInfoListModel, 'posts');
          } else {
            U.bindData(postsWrapper, PostInfoListModel, 'posts');
          }
        })
        .catch(function(err) {
          U.error(err);
        })
        .finally(function() {
          U.broadcast($scope);
        });
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
        .then(function(array){
          var postsWrapper = array[0];
          return postsWrapper;
        });
    }

  }
})();
