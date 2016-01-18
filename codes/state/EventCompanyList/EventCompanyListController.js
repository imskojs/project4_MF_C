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
    var initPromise;
    var noLoadingStates = [
      'Main.EventCompanyContact', 'Main.EventCompanyDetail'
    ];

    EventCompanyList.loadMore = loadMore;
    EventCompanyList.refresh = refresh;

    $scope.$on('$ionicView.beforeEnter', onBeforeEnter);
    $scope.$on('$ionicView.afterEnter', onAfterEnter);

    //====================================================
    // Initial Loading of a state;
    //====================================================
    function onBeforeEnter() {
      if (!U.hasPreviousStates(noLoadingStates)) {
        U.loading(EventCompanyListModel);
        initPromise = init();
      }
    }

    function onAfterEnter() {
      if (!U.hasPreviousStates(noLoadingStates)) {
        return initPromise
          .then(function(postsWrapper) {
            console.log("---------- postsWrapper ----------");
            console.log(postsWrapper);
            U.bindData(postsWrapper, EventCompanyListModel, 'posts');
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
          U.bindData(postsWrapper, EventCompanyListModel, 'posts');
        })
        .catch(function(err) {
          U.error(err);
        })
        .finally(function() {
          U.broadcast($scope);
        });
    }

    function loadMore() {
      var last = EventCompanyListModel.posts.length - 1;
      return find({
          id: {
            '<': EventCompanyListModel.posts[last].id
          }
        })
        .then(function(postsWrapper) {
          U.appendData(postsWrapper, EventCompanyListModel, 'posts');
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
