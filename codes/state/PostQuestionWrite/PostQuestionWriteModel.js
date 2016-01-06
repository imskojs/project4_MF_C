(function() {
  'use strict';

  angular.module('app')
    .factory('PostQuestionWriteModel', PostQuestionWriteModel);

  PostQuestionWriteModel.$inject = [];

  function PostQuestionWriteModel() {

    var Model = {
      form: {
        title: '',
        content: ''
      }
    };

    return Model;
  }
})();
