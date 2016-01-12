(function() {
  'use strict';
  angular.module('app')
    .controller('EventCompanyListController', EventCompanyListController);

  EventCompanyListController.$inject = [
    '$scope', '$q', '$ionicScrollDelegate',
    'EventCompanyListModel', 'U', 'Post', 'Preload'
  ];

  function EventCompanyListController(
    $scope, $q, $ionicScrollDelegate,
    EventCompanyListModel, U, Post, Preload
  ) {
    var EventCompanyList = this;
    EventCompanyList.Model = EventCompanyListModel;
    var noLoadingStates = [
      'Main.EventCompanyContact', 'Main.EventCompanyDetail'
    ];

    EventCompanyList.loadMore = loadMore;
    EventCompanyList.refresh = refresh;

    $scope.$on('$ionicView.beforeEnter', onBeforeEnter);
    $scope.$on('$ionicView.afterEnter', onAfterEnter);
    $scope.$on('$ionicView.beforeLeave', onBeforeLeave);

    //====================================================
    // Initial Loading of a state;
    //====================================================
    function onBeforeEnter() {
      if (!U.hasPreviousStates(noLoadingStates)) {
        U.loading(EventCompanyListModel);
      }
    }

    function onAfterEnter() {
      if (!U.hasPreviousStates(noLoadingStates)) {
        return loadPost();
      }
    }

    function onBeforeLeave() {
      U.resetSlides();
    }

    function refresh() {
      loadPost();
    }

    function loadMore() {
      var last = EventCompanyListModel.posts.length - 1;
      return loadPost({
        id: {
          '<': EventCompanyListModel.posts[last].id
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
            U.appendData(postsWrapper, EventCompanyListModel, 'posts');
          } else {
            U.bindData(postsWrapper, EventCompanyListModel, 'posts');
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
    // REST
    //====================================================
    function find(extraQuery, extraOperation) {
      var queryWrapper = {
        query: {
          where: {
            category: 'EVENT-POST',
            eventType: 'COMPANY-EVENT'
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
