(function() {
  'use strict';

  angular.module('app')
    .factory('PostInfoDetailModel', PostInfoDetailModel);

  PostInfoDetailModel.$inject = [

  ];

  function PostInfoDetailModel(

  ) {

    var Model = {
      loading: false,
      post: {},
      comments: []
    };

    return Model;
  }
})();
