(function(angular) {
  'use strict';
  angular.module('app')
    .controller('SampleDetailController', SampleDetailController);

  SampleDetailController.$inject = [
    '$scope', '$state', '$q', '$ionicScrollDelegate',
    'SampleDetailModel', 'Post', 'Message', 'U', 'Preload'
  ];

  function SampleDetailController(
    $scope, $state, $q, $ionicScrollDelegate,
    SampleDetailModel, Post, Message, U, Preload
  ) {
    var SampleDetail = this;
    SampleDetail.Model = SampleDetailModel;

    $scope.$on('$ionicView.beforeEnter', onBeforeEnter);
    $scope.$on('$ionicView.afterEnter', onAfterEnter);

    //====================================================
    // Initial Loading of a state;
    //====================================================
    function onBeforeEnter() {
      SampleDetailModel.loading = true;
      $ionicScrollDelegate.scrollTop(false);
    }

    function onAfterEnter() {
      return findOne()
        .then(function(post) {
          console.log(post);
          U.bindData(post, SampleDetailModel, 'post');
        })
        .catch(U.error);
    }

    //====================================================
    //  Implementations
    //====================================================
    function findOne(extraQuery) {
      var queryWrapper = {
        query: {
          id: $state.params.id
        }
      };
      angular.extend(queryWrapper.query, extraQuery);
      return Post.findOne(queryWrapper).$promise
        .then(function(post) {
          var photosPromise = Preload.photos(post, 'cloudinary200', false);
          return $q.all([post, photosPromise]);
        })
        .then(function(array) {
          var post = array[0];
          return post;
        });
    }

  } //end
})(angular);






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
