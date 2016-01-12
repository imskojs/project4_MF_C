(function(angular) {
  'use strict';
  angular.module('app')
    .controller('EventCompanyDetailController', EventCompanyDetailController);

  EventCompanyDetailController.$inject = [
    '$scope', '$state', '$q', '$ionicScrollDelegate',
    'EventCompanyDetailModel', 'Post', 'Comment', 'Message', 'U', 'Preload'
  ];

  function EventCompanyDetailController(
    $scope, $state, $q, $ionicScrollDelegate,
    EventCompanyDetailModel, Post, Comment, Message, U, Preload
  ) {
    var EventCompanyDetail = this;
    EventCompanyDetail.Model = EventCompanyDetailModel;
    var noLoadingStates = [];
    $scope.$on('$ionicView.beforeEnter', onBeforeEnter);
    $scope.$on('$ionicView.afterEnter', onAfterEnter);
    $scope.$on('$ionicView.beforeLeave', onBeforeLeave);

    EventCompanyDetail.refresh = refresh;
    EventCompanyDetail.loadMoreComments = loadMoreComments;
    EventCompanyDetail.createComment = createComment;
    EventCompanyDetail.destroyComment = destroyComment;

    //====================================================
    // Implementation
    //====================================================
    function onBeforeEnter() {
      if (!U.hasPreviousStates(noLoadingStates)) {
        U.loading(EventCompanyDetailModel);
      }
    }

    function onAfterEnter() {
      if (!U.hasPreviousStates(noLoadingStates)) {
        loadAll();
      }
    }

    function onBeforeLeave() {
      U.resetSlides();
    }

    function refresh() {
      loadAll();
    }

    function loadMoreComments() {
      var last = EventCompanyDetailModel.comments.length - 1;
      return findComments({
          id: {
            '<': EventCompanyDetailModel.comments[last].id
          }
        })
        .then(function(commentsWrapper) {
          U.appendData(commentsWrapper, EventCompanyDetailModel, 'comments');
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

    function loadAll() {
      EventCompanyDetail.commentContent = '';
      return $q.all([findOnePost(), findComments()])
        .then(function(array) {
          var post = array[0];
          var commentsWrapper = array[1];
          U.bindData(post, EventCompanyDetailModel, 'post');
          U.bindData(commentsWrapper, EventCompanyDetailModel, 'comments');
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
    function findOnePost(extraQuery) {
      var queryWrapper = {
        query: {
          where: {
            id: $state.params.id,
          },
          populates: ['createdBy']
        }
      };
      angular.extend(queryWrapper.query.where, extraQuery);
      return Post.findOne(queryWrapper).$promise
        .then(function(post) {
          var photosPromise = Preload.photos(post, 'Cloudinary200', false, 'neverMind');
          return $q.all([post, photosPromise]);
        })
        .then(function(array) {
          var post = array[0];
          console.log("---------- post ----------");
          console.log(post);
          return post;
        });
    }

    function findComments(extraQuery) {
      var queryWrapper = {
        query: {
          where: {
            post: $state.params.id,
          },
          sort: 'id ASC',
          limit: 100,
          populates: ['createdBy']
        }
      };
      angular.extend(queryWrapper.query.where, extraQuery);
      return Comment.find(queryWrapper).$promise
        .then(function(commentsWrapper) {
          var photosPromise = Preload.photos(commentsWrapper.comments, 'Cloudinary200', false, 'neverMind');
          return $q.all([commentsWrapper, photosPromise]);
        })
        .then(function(array) {
          var commentsWrapper = array[0];
          console.log("---------- commentsWrapper ----------");
          console.log(commentsWrapper);
          return commentsWrapper;
        });
    }

    function createComment() {
      var queryWrapper = {
        query: {
          post: $state.params.id,
          content: EventCompanyDetail.commentContent
        }
      };
      return Comment.create({}, queryWrapper).$promise
        .then(function(createdComment) {
          console.log("---------- createdComment ----------");
          console.log(createdComment);
          refresh();
        })
        .catch(function(err) {
          U.error(err);
        });
    }

    function destroyComment(commentId) {
      var queryWrapper = {
        query: {
          id: commentId
        }
      };
      return Comment.destroy(queryWrapper).$promise
        .then(function(destroyedComment) {
          console.log("---------- destroyedComment ----------");
          console.log(destroyedComment);
          refresh();
        })
        .catch(function(err) {
          U.error(err);
        });
    }

  } //end
})(angular);
