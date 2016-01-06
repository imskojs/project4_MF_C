/**
 * Created by Seunghoon Ko on 10/10/2015
 * As part of applicat platform
 *
 * Copyright (C) Applicat (www.applicat.co.kr) & Seunghoon Ko - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Seunghoon Ko <imskojs@gmail.com>, 10/10/2015
 *
 */
(function(angular) {
  'use strict';
  angular.module('app')
    .controller('SampleListController', SampleListController);

  SampleListController.$inject = [
    '$scope', '$q',
    'SampleListModel', 'Post', 'Message', 'U', 'Preload'
  ];

  function SampleListController(
    $scope, $q,
    SampleListModel, Post, Message, U, Preload
  ) {
    var SampleList = this;
    SampleList.Model = SampleListModel;
    var noLoadingStates = ['main.sampleDetail'];

    SampleList.refresh = refresh;
    SampleList.loadMore = loadMore;

    $scope.$on('$ionicView.beforeEnter', onBeforeEnter);
    $scope.$on('$ionicView.afterEnter', onAfterEnter);

    //====================================================
    // Initial Loading of a state;
    //====================================================
    function onBeforeEnter() {
      if (!U.areSiblingViews(noLoadingStates)) {
        SampleListModel.loading = true;
      }
    }

    function onAfterEnter() {
      if (!U.areSiblingViews(noLoadingStates)) {
        return find()
          .then(function(postsWrapper) {
            console.log(postsWrapper);
            U.bindData(postsWrapper, SampleListModel, 'posts');
          })
          .catch(U.error);
      }
    }

    function refresh() {
      return find()
        .then(function(postsWrapper) {
          console.log(postsWrapper);
          U.bindData(postsWrapper, SampleListModel, 'posts');
        })
        .catch(U.error)
        .finally(function() {
          U.broadcast($scope);
        });
    }

    function loadMore() {
      var last = SampleListModel.posts.length - 1;
      return find({
          olderThan: SampleListModel.posts[last]
        })
        .then(function(postsWrapper) {
          U.appendData(postsWrapper, SampleListModel, 'posts');
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
      var query = {
        category: 'notification',
        limit: 20,
        sort: 'id DESC'
      };
      angular.extend(query, extraQuery);
      return Post.find(query).$promise
        .then(function(postsWrapper) {
          var photosPromise = Preload.photos(postsWrapper.posts, 'cloudinary200', true);
          return $q.all([postsWrapper, photosPromise]);
        })
        .then(function(array) {
          var postsWrapper = array[0];
          return postsWrapper;
        });
    }

  } //end
})(angular);
