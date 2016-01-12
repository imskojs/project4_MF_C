(function() {
  'use strict';
  angular.module('app')
    .controller('PostInfoWriteController', PostInfoWriteController);

  PostInfoWriteController.$inject = [
    '$scope',
    'PostInfoModel', 'PostInfoWriteModel', 'Post', 'U', 'Message'
  ];

  function PostInfoWriteController(
    $scope,
    PostInfoModel, PostInfoWriteModel, Post, U, Message
  ) {
    var PostInfoWrite = this;
    PostInfoWrite.Model = PostInfoWriteModel;
    PostInfoWrite.sendForm = sendForm;


    $scope.$on('$ionicView.beforeLeave', onBeforeLeave);
    //====================================================
    //  Implementation
    //====================================================
    function onBeforeLeave() {
      PostInfoWriteModel.form.title = '';
      PostInfoWriteModel.form.content = '';
      PostInfoWriteModel.form.fitnessType = '';
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
          U.goToState('Main.PostInfo.PostInfoList', null, 'back');
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
