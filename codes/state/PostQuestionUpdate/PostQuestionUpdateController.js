(function() {
  'use strict';
  angular.module('app')
    .controller('PostQuestionUpdateController', PostQuestionUpdateController);

  PostQuestionUpdateController.$inject = [
    '$scope', '$state', '$q',
    'PostQuestionModel', 'PostQuestionUpdateModel', 'U', 'Post', 'Preload', 'Message'
  ];

  function PostQuestionUpdateController(
    $scope, $state, $q,
    PostQuestionModel, PostQuestionUpdateModel, U, Post, Preload, Message
  ) {
    var PostQuestionUpdate = this;
    PostQuestionUpdate.Model = PostQuestionUpdateModel;
    $scope.$on('$ionicView.beforeEnter', onBeforeEnter);
    $scope.$on('$ionicView.afterEnter', onAfterEnter);
    $scope.$on('$ionicView.beforeLeave', onBeforeLeave);

    PostQuestionUpdate.sendForm = sendForm;
    //====================================================
    //  Implementation
    //====================================================
    function onBeforeEnter() {
      U.loading(PostQuestionUpdateModel);
    }

    function onAfterEnter() {
      return findOnePost()
        .then(function(post) {
          U.bindData(post, PostQuestionUpdateModel, 'form');
        })
        .catch(function(err) {
          U.error(err);
        });
    }

    function onBeforeLeave() {
      PostQuestionUpdateModel.form = {
        title: '',
        content: ''
      };
    }

    function sendForm() {
      Message.loading();
      return updatePost()
        .then(function(updatedPost) {
          console.log("---------- updatedPost ----------");
          console.log(updatedPost);
          return Message.alert('글 수정 알림', '글수정을 완료하였습니다.');
        })
        .then(function() {
          U.goToState('Main.PostQuestionDetail', { id : $state.params.id });
        })
        .catch(function(err) {
          U.error(err);
        });
    }

    //====================================================
    //  REST
    //====================================================
    function findOnePost(extraQuery, extraOperation) {
      var queryWrapper = {
        query: {
          where: {
            id: $state.params.id
          }
        }
      };
      angular.extend(queryWrapper.query.where, extraQuery);
      angular.extend(queryWrapper.query, extraOperation);
      return Post.findOne(queryWrapper).$promise
        .then(function(post) {
          var photosPromise = Preload.photos(post, 'Cloudinary600', true, 'neverMind');
          return $q.all([post, photosPromise]);
        })
        .then(function(array) {
          var post = array[0];
          return post;
        });
    }

    function updatePost() {
      var queryWrapper = {
        query: {
          id: $state.params.id,
          title: PostQuestionUpdateModel.form.title,
          content: PostQuestionUpdateModel.form.content
        }
      };
      return Post.update({}, queryWrapper).$promise;
    }
  }
})();
