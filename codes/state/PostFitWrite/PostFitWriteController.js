(function() {
  'use strict';
  angular.module('app')
    .controller('PostFitWriteController', PostFitWriteController);

  PostFitWriteController.$inject = [
    'PostFitModel', 'PostFitWriteModel', 'Post', 'U', 'Message'
  ];

  function PostFitWriteController(
    PostFitModel, PostFitWriteModel, Post, U, Message
  ) {
    var PostFitWrite = this;
    PostFitWrite.Model = PostFitWriteModel;
    PostFitWrite.sendForm = sendForm;


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
          U.goToState('Main.PostFit.PostFitList');
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
          category: 'TOGETHER-POST',
          title: PostFitWriteModel.form.title,
          content: PostFitWriteModel.form.content,
          location: PostFitModel.Location.name
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
    //         category: 'TOGETHER-POST',
    //         title: PostFitWriteModel.title,
    //         content: PostFitWriteModel.content,
    //         files: PostFitWriteModel.files
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
