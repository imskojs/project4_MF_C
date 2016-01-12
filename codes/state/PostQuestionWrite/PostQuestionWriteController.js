(function() {
  'use strict';
  angular.module('app')
    .controller('PostQuestionWriteController', PostQuestionWriteController);

  PostQuestionWriteController.$inject = [
    '$scope',
    'PostQuestionWriteModel', 'Post', 'U', 'Message'
  ];

  function PostQuestionWriteController(
    $scope,
    PostQuestionWriteModel, Post, U, Message
  ) {
    var PostQuestionWrite = this;
    PostQuestionWrite.Model = PostQuestionWriteModel;
    PostQuestionWrite.sendForm = sendForm;


    $scope.$on('$ionicView.beforeLeave', onBeforeLeave);
    //====================================================
    //  Implementation
    //====================================================
    function onBeforeLeave() {
      PostQuestionWriteModel.form.title = '';
      PostQuestionWriteModel.form.content = '';
    }

    function sendForm() {
      Message.loading();
      return createPost()
        .then(function(createdPost) {
          console.log("---------- createdPost ----------");
          console.log(createdPost);
          return Message.alert('글작성 알림', '글을 성공적으로 작성하였습니다.');
        })
        .then(function() {
          U.goToState('Main.PostQuestion.PostQuestionList', null, 'back');
        })
        .catch(function(err) {
          U.error(err);
        });
    }


    //====================================================
    //  REST
    //====================================================
    function createPost() {
      var queryWrapper = {
        query: {
          category: 'QUESTION-POST',
          title: PostQuestionWriteModel.form.title,
          content: PostQuestionWriteModel.form.content
        }
      };
      return Post.create({}, queryWrapper).$promise
        .then(function(dataWrapper) {
          return dataWrapper.data;
        });
    }
    //====================================================
    //  Future use. Not applied yet.
    //====================================================
    // function create() {
    //   var queryWrapper = {
    //     query: {
    //       where: {},
    //       data: {
    //         category: 'QUESTION-POST',
    //         title: PostQuestionWriteModel.title,
    //         content: PostQuestionWriteModel.content,
    //         files: PostQuestionWriteModel.files
    //       }
    //     },
    //   };
    //   Post.create({}, queryWrapper).$promise
    //     .then(function(dataWrapper) {
    //       return dataWrapper.data;
    //     });
    // }
  }
})();
