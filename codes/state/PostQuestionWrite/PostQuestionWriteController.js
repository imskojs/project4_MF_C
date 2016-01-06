(function() {
  'use strict';
  angular.module('app')
    .controller('PostQuestionWriteController', PostQuestionWriteController);

  PostQuestionWriteController.$inject = [
    'Locations', 'PostQuestionWriteModel', 'Message',
    '$scope'
  ];

  function PostQuestionWriteController(
    Locations, PostQuestionWriteModel, Message,
    $scope
  ) {
    var PostQuestionWrite = this;
    PostQuestionWrite.Model = PostQuestionWriteModel;

    PostQuestionWrite.sendForm = sendForm;
    $scope.$on('$ionicView.beforeLeave', onBeforeLeave);
    //====================================================
    //  Implementation
    //====================================================
    function sendForm() {
      Message.loading();
      Post.create({}, {
          category: 'QUESTION-POST',
          title: PostQuestionWriteModel.form.title,
          content: PostQuestionWriteModel.form.content
        }).$promise
        .then(function(createdPost) {
          console.log("---------- createdPost ----------");
          console.log(createdPost);
          Message.alert('궁금한 사항 상담 알림', '상담이 등록되었습니다.');
        })
        .catch(function(err) {
          console.log("---------- err ----------");
          console.log(err);
          Message.alert();
        });

    }

    function onBeforeLeave() {
      PostQuestionWriteModel.title = '';
      PostQuestionWriteModel.content = '';
    }
  }
})();
