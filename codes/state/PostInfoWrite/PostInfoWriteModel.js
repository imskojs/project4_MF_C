(function() {
  'use strict';

  angular.module('app')
    .factory('PostInfoWriteModel', PostInfoWriteModel);

  PostInfoWriteModel.$inject = [

  ];

  function PostInfoWriteModel(

  ) {

    var Model = {
      post: {},
      loading: false
    };

    return Model;
  }
})();
