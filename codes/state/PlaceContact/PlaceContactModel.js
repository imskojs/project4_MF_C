(function() {
  'use strict';

  angular.module('app')
    .factory('PlaceContactModel', PlaceContactModel);

  PlaceContactModel.$inject = [

  ];

  function PlaceContactModel(

  ) {

    var Model = {
      form: {
        title: '',
        phone: '',
        content: ''
      }
    };

    return Model;
  }
})();
