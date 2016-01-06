(function() {
  'use strict';
  angular.module('app')
    .controller('EventFitMateListController', EventFitMateListController);

  EventFitMateListController.$inject = [
    '$scope', '$q', '$ionicScrollDelegate',
    'EventFitMateListModel', 'U', 'Post', 'Preload'
  ];

  function EventFitMateListController(
    $scope, $q, $ionicScrollDelegate,
    EventFitMateListModel, U, Post, Preload
  ) {
    var EventFitMateList = this;
    EventFitMateList.Model = EventFitMateListModel;
    var noLoadingStates = [];

    EventFitMateList.loadMore = loadMore;

    $scope.$on('$ionicView.beforeEnter', onBeforeEnter);
    $scope.$on('$ionicView.afterEnter', onAfterEnter);

    //====================================================
    // Initial Loading of a state;
    //====================================================
    function onBeforeEnter() {
      if (!U.areSiblingViews(noLoadingStates)) {
        EventFitMateListModel.posts = [];
        $ionicScrollDelegate.scrollTop(false);
        EventFitMateListModel.loading = true;
      }
    }

    function onAfterEnter() {
      if (!U.areSiblingViews(noLoadingStates)) {
        return find()
          .then(function(postsWrapper) {
            console.log(postsWrapper);
            U.bindData(postsWrapper, EventFitMateListModel, 'posts');
          })
          .catch(U.error);
      }
    }

    function loadMore() {
      var last = EventFitMateListModel.posts.length - 1;
      return find({
          olderThan: EventFitMateListModel.posts[last].id
        })
        .then(function(postsWrapper) {
          U.appendData(postsWrapper, EventFitMateListModel, 'posts');
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
