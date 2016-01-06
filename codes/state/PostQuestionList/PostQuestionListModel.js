(function() {
  'use strict';

  angular.module('app')
    .factory('PostQuestionListModel', PostQuestionListModel);

  PostQuestionListModel.$inject = [];

  function PostQuestionListModel() {

    var Model = {
      loading: false,
      posts: [{
        title: '(공지사항) 필독해 주세요~! ',
        createdBy: {
          name: '관리자'
        },
        createdAt: new Date(),
        views: 444
      }]
    };

    return Model;
  }
})();
