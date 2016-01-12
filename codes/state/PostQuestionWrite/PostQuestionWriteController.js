(function() {
  'use strict';
  angular.module('app')
    .controller('PostQuestionWriteController', PostQuestionWriteController);

  PostQuestionWriteController.$inject = [
    'PostQuestionWriteModel', 'Post', 'U', 'Message'
  ];

  function PostQuestionWriteController(
    PostQuestionWriteModel, Post, U, Message
  ) {
    var PostQuestionWrite = this;
    PostQuestionWrite.Model = PostQuestionWriteModel;
    PostQuestionWrite.sendForm = sendForm;


    //====================================================
    //  Implementation
    //====================================================
    function sendForm() {
      Message.loading();
      return createPost()
        .then(function(createdPost) {
          Message.hide();
          console.log("---------- createdPost ----------");
          console.log(createdPost);
        })
        .then(function(){
          U.goToState('Main.PostQuestion.PostQuestionList');
        })
        .catch(function(err) {
          Message.hide();
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
