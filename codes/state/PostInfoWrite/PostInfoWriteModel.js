(function() {
  'use strict';

  angular.module('app')
    .factory('PostInfoWriteModel', PostInfoWriteModel);

  PostInfoWriteModel.$inject = [

  ];

  function PostInfoWriteModel(

  ) {

    var Model = {
      form: {
        title: '',
        content: '',
        fitnessType: ''
      }
    };

    return Model;
  }
})();
