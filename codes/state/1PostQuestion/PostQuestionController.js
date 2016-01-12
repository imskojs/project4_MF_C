(function() {
  'use strict';
  angular.module('app')
    .controller('PostQuestionController', PostQuestionController);

  PostQuestionController.$inject = [
    'PostQuestionModel'
  ];

  function PostQuestionController(
    PostQuestionModel
  ) {
    var PostQuestion = this;
    PostQuestion.Model = PostQuestionModel;
  }
})();
