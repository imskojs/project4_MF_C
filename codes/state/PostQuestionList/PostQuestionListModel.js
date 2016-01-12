(function() {
  'use strict';

  angular.module('app')
    .factory('PostQuestionListModel', PostQuestionListModel);

  PostQuestionListModel.$inject = [];

  function PostQuestionListModel() {

    var Model = {
      loading: false,
      posts: []
    };

    return Model;
  }
})();
