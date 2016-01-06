(function(angular) {
  'use strict';
  angular.module('app')
    .factory('Users', Users);

  Users.$inject = [
    '$resource',
    'SERVER_URL', 'Photo'
  ];

  function Users(
    $resource,
    SERVER_URL, Photo
  ) {

    var postUrl = SERVER_URL + '/user';

    var params = {};

    var actions = {};

    var service = $resource(postUrl, params, actions);

    service.registerWithImage = registerWithImage;

    return service;

    function registerWithImage(param, query) {
      var promise = Photo.post(
        '/user/registerWithImage',
        query,
        'POST'
      );
      return {
        $promise: promise
      };
    }

  }
})(angular);
