(function() {
  'use strict';

  angular.module('app')
    .factory('PostInfoUpdateModel', PostInfoUpdateModel);

  PostInfoUpdateModel.$inject = [];

  function PostInfoUpdateModel() {

    var Model = {
      form: {}
    };

    return Model;
  }
})();
