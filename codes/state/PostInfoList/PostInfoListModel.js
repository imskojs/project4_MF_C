(function() {
  'use strict';

  angular.module('app')
    .factory('PostInfoListModel', PostInfoListModel);

  PostInfoListModel.$inject = [

  ];

  function PostInfoListModel(

  ) {

    var Model = {
      loading: false,
      posts: []
    };

    return Model;
  }
})();
