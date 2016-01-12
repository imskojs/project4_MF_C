(function(angular) {
  'use strict';
  angular.module('app')
    .controller('PostQuestionDetailController', PostQuestionDetailController);

  PostQuestionDetailController.$inject = [
    '$scope', '$state', '$q', '$ionicScrollDelegate',
    'PostQuestionDetailModel', 'Post', 'Comment', 'Message', 'U', 'Preload'
  ];

  function PostQuestionDetailController(
    $scope, $state, $q, $ionicScrollDelegate,
    PostQuestionDetailModel, Post, Comment, Message, U, Preload
  ) {
    var PostQuestionDetail = this;
    PostQuestionDetail.Model = PostQuestionDetailModel;
    var initPromise;
    var noLoadingStates = [];
    $scope.$on('$ionicView.beforeEnter', onBeforeEnter);
    $scope.$on('$ionicView.afterEnter', onAfterEnter);
    $scope.$on('$ionicView.beforeLeave', onBeforeLeave);

    PostQuestionDetail.refresh = refresh;
    PostQuestionDetail.loadMoreComments = loadMoreComments;
    PostQuestionDetail.destroyPost = destroyPost;
    PostQuestionDetail.createComment = createComment;
    PostQuestionDetail.destroyComment = destroyComment;

    // AppSpecific
    PostQuestionDetail.showBubble = false;

    //====================================================
    // Implementation
    //====================================================
    function onBeforeEnter() {
      if (!U.hasPreviousStates(noLoadingStates)) {
        U.loading(PostQuestionDetailModel);
        initPromise = init();
      }
    }

    function onAfterEnter() {
      if (!U.hasPreviousStates(noLoadingStates)) {
        return initPromise
          .then(function(array) {
            var post = array[0];
            var commentsWrapper = array[1];
            U.bindData(post, PostQuestionDetailModel, 'post');
            U.bindData(commentsWrapper, PostQuestionDetailModel, 'comments');
          })
          .catch(function(err) {
            U.error(err);
          });
      }
    }

    function onBeforeLeave() {
      U.resetSlides();
      PostQuestionDetail.showBubble = false;
      PostQuestionDetail.commentContent = '';
    }

    function refresh() {
      return init()
        .then(function(array) {
          var post = array[0];
          var commentsWrapper = array[1];
          U.bindData(post, PostQuestionDetailModel, 'post');
          U.bindData(commentsWrapper, PostQuestionDetailModel, 'comments');
        })
        .catch(function(err) {
          U.error(err);
        })
        .finally(function() {
          U.broadcast($scope);
        });
    }

    function loadMoreComments() {
      var last = PostQuestionDetailModel.comments.length - 1;
      return findComments({
          id: {
            '<': PostQuestionDetailModel.comments[last].id
          }
        })
        .then(function(commentsWrapper) {
          U.appendData(commentsWrapper, PostQuestionDetailModel, 'comments');
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
      return $q.all([findOnePost(), findComments()]);
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

    function destroyPost() {
      var queryWrapper = {
        query: {
          id: $state.params.id
        }
      };
      Message.loading();
      return Post.destroy(queryWrapper).$promise
        .then(function(destroyedPost) {
          console.log("---------- destroyedPost ----------");
          console.log(destroyedPost);
          return Message.alert('글삭제 알림', '글을 성공적으로 삭제하였습니다.');
        })
        .then(function() {
          U.goToState('Main.PostQuestion.PostQuestionList', null, 'back');
        })
        .catch(function(err) {
          U.error(err);
        });
    }

    function createComment() {
      var queryWrapper = {
        query: {
          post: $state.params.id,
          content: PostQuestionDetail.commentContent
        }
      };
      Message.loading();
      return Comment.create({}, queryWrapper).$promise
        .then(function(createdComment) {
          console.log("---------- createdComment ----------");
          console.log(createdComment);
          refresh();
          return Message.alert('댓글달기 알림', '댓글을 성공적으로 작성하였습니다.');
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
      Message.loading();
      return Comment.destroy(queryWrapper).$promise
        .then(function(destroyedComment) {
          console.log("---------- destroyedComment ----------");
          console.log(destroyedComment);
          refresh();
          return Message.alert('댓글 알림', '댓글을 성공적으로 삭제하였습니다.');
        })
        .catch(function(err) {
          U.error(err);
        });
    }

  } //end
})(angular);
