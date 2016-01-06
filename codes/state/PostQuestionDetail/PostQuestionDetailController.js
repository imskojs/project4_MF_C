(function(angular) {
  'use strict';
  angular.module('app')
    .controller('PostQuestionDetailController', PostQuestionDetailController);

  PostQuestionDetailController.$inject = [
    '$scope', '$state', '$q', '$ionicScrollDelegate',
    'PostQuestionDetailModel', 'Post', 'Message', 'U', 'Preload'
  ];

  function PostQuestionDetailController(
    $scope, $state, $q, $ionicScrollDelegate,
    PostQuestionDetailModel, Post, Message, U, Preload
  ) {
    var PostQuestionDetail = this;
    PostQuestionDetail.Model = PostQuestionDetailModel;

    $scope.$on('$ionicView.beforeEnter', onBeforeEnter);
    $scope.$on('$ionicView.afterEnter', onAfterEnter);

    //====================================================
    // Initial Loading of a state;
    //====================================================
    function onBeforeEnter() {
      // PostQuestionDetailModel.loading = true;
      $ionicScrollDelegate.scrollTop(false);
    }

    function onAfterEnter() {
      $q.all([PostFindOne(), CommentsFind()])
        .then(function(array) {
          var post = array[0];
          var commentsWrapper = array[1];
          console.log("---------- post ----------");
          console.log(post);
          console.log("---------- commentsWrapper ----------");
          console.log(commentsWrapper);
          // U.bindData(post, PostQuestionDetailModel, 'post');
          // U.bindData(commentsWrapper, PostQuestionDetailModel, 'comments');
        })
        .catch(U.error);
    }

    //====================================================
    //  Implementations
    //====================================================
    function PostFindOne(extraQuery) {
      var queryWrapper = {
        query: {
          id: $state.params.id,
          populates: ['createdBy']
        }
      };
      angular.extend(queryWrapper.query, extraQuery);
      return Post.findOne(queryWrapper).$promise
        .then(function(post) {
          var photosPromise = Preload.photos(post, 'cloudinary200', false, 'neverMind');
          return $q.all([post, photosPromise]);
        })
        .then(function(array) {
          var post = array[0];
          return post;
        });
    }

    function CommentsFind(extraQuery) {
      var queryWrapper = {
        query: {
          post: $state.params.id,
          sort: 'id ASC',
          limit: 999,
          populates: ['createdBy']
        }
      };
      angular.extend(queryWrapper.query, extraQuery);
      return Comment.find(queryWrapper).$promise
        .then(function(commentsWrapper) {
          var photosPromise = Preload.photos(commentsWrapper.comments, 'cloudinary200', false, 'neverMind');
          return $q.all([commentsWrapper, photosPromise]);
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
