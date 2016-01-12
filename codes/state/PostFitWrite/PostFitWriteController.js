(function() {
  'use strict';
  angular.module('app')
    .controller('PostFitWriteController', PostFitWriteController);

  PostFitWriteController.$inject = [
    'PostFitModel', 'PostFitWriteModel', 'Post', 'U', 'Message',
    '$scope'
  ];

  function PostFitWriteController(
    PostFitModel, PostFitWriteModel, Post, U, Message,
    $scope
  ) {
    var PostFitWrite = this;
    PostFitWrite.Model = PostFitWriteModel;
    PostFitWrite.sendForm = sendForm;


    $scope.$on('$ionicView.beforeLeave', onBeforeLeave);
    //====================================================
    //  Implementation
    //====================================================
    function onBeforeLeave() {
      PostFitWriteModel.form.title = '';
      PostFitWriteModel.form.content = '';
      PostFitWriteModel.form.location = '';
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
          U.goToState('Main.PostFit.PostFitList', null, 'back');
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
