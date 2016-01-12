(function() {
  'use strict';

  angular.module('app')
    .factory('EventCompanyContactModel', EventCompanyContactModel);

  EventCompanyContactModel.$inject = [

  ];

  function EventCompanyContactModel(

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
