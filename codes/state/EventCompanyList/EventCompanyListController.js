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
    var noLoadingStates = [];

    EventCompanyList.loadMore = loadMore;

    $scope.$on('$ionicView.beforeEnter', onBeforeEnter);
    $scope.$on('$ionicView.afterEnter', onAfterEnter);

    //====================================================
    // Initial Loading of a state;
    //====================================================
    function onBeforeEnter() {
      if (!U.areSiblingViews(noLoadingStates)) {
        EventCompanyListModel.posts = [];
        $ionicScrollDelegate.scrollTop(false);
        EventCompanyListModel.loading = true;
      }
    }

    function onAfterEnter() {
      if (!U.areSiblingViews(noLoadingStates)) {
        return find()
          .then(function(postsWrapper) {
            console.log(postsWrapper);
            U.bindData(postsWrapper, EventCompanyListModel, 'posts');
          })
          .catch(U.error);
      }
    }

    function loadMore() {
      var last = EventCompanyListModel.posts.length - 1;
      return find({
          olderThan: EventCompanyListModel.posts[last].id
        })
        .then(function(postsWrapper) {
          U.appendData(postsWrapper, EventCompanyListModel, 'posts');
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
