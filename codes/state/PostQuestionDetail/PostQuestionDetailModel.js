(function() {
  'use strict';

  angular.module('app')
    .factory('PostQuestionDetailModel', PostQuestionDetailModel);

  PostQuestionDetailModel.$inject = [];

  function PostQuestionDetailModel() {

    var Model = {
      loading: false,
      post: {},
      comments: []
    };

    return Model;
  }
})();
