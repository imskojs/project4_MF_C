(function() {
  'use strict';

  angular.module('app')
    .factory('PostFitWriteModel', PostFitWriteModel);

  PostFitWriteModel.$inject = [

  ];

  function PostFitWriteModel(

  ) {

    var Model = {
      form: {
        title: '',
        content: '',
        location: ''
      }
    };

    return Model;
  }
})();
