(function() {
  'use strict';

  angular.module('app')
    .factory('PostQuestionUpdateModel', PostQuestionUpdateModel);

  PostQuestionUpdateModel.$inject = [];

  function PostQuestionUpdateModel() {

    var Model = {
      form: {}
    };

    return Model;
  }
})();
