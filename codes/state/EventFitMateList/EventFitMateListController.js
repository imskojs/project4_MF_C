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
    var initPromise;
    var noLoadingStates = [
      'Main.EventFitMateDetail'
    ];

    EventFitMateList.loadMore = loadMore;
    EventFitMateList.refresh = refresh;

    $scope.$on('$ionicView.beforeEnter', onBeforeEnter);
    $scope.$on('$ionicView.afterEnter', onAfterEnter);

    //====================================================
    // Initial Loading of a state;
    //====================================================
    function onBeforeEnter() {
      if (!U.hasPreviousStates(noLoadingStates)) {
        U.loading(EventFitMateListModel);
        initPromise = init();
      }
    }

    function onAfterEnter() {
      if (!U.hasPreviousStates(noLoadingStates)) {
        return initPromise
          .then(function(postsWrapper) {
            console.log("---------- postsWrapper ----------");
            console.log(postsWrapper);
            U.bindData(postsWrapper, EventFitMateListModel, 'posts');
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
          U.bindData(postsWrapper, EventFitMateListModel, 'posts');
        })
        .catch(function(err) {
          U.error(err);
        })
        .finally(function() {
          U.broadcast($scope);
        });
    }

    function loadMore() {
      var last = EventFitMateListModel.posts.length - 1;
      return find({
          id: {
            '<': EventFitMateListModel.posts[last].id
          }
        })
        .then(function(postsWrapper) {
          U.appendData(postsWrapper, EventFitMateListModel, 'posts');
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
            category: 'EVENT-POST',
            eventType: 'FITMATE-EVENT'
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
