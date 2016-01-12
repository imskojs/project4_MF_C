(function() {
  'use strict';
  angular.module('app')
    .controller('PostInfoWriteController', PostInfoWriteController);

  PostInfoWriteController.$inject = [
    'PostInfoModel', 'PostInfoWriteModel', 'Post', 'U', 'Message'
  ];

  function PostInfoWriteController(
    PostInfoModel, PostInfoWriteModel, Post, U, Message
  ) {
    var PostInfoWrite = this;
    PostInfoWrite.Model = PostInfoWriteModel;
    PostInfoWrite.sendForm = sendForm;


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
          U.goToState('Main.PostInfo.PostInfoList');
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
          category: 'INFO-POST',
          title: PostInfoWriteModel.form.title,
          content: PostInfoWriteModel.form.content,
          fitnessType: PostInfoModel.Info.name
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
    //         category: 'INFO-POST',
    //         title: PostInfoWriteModel.title,
    //         content: PostInfoWriteModel.content,
    //         files: PostInfoWriteModel.files
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
