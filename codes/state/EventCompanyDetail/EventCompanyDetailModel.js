(function() {
  'use strict';

  angular.module('app')
    .factory('EventCompanyDetailModel', EventCompanyDetailModel);

  EventCompanyDetailModel.$inject = [

  ];

  function EventCompanyDetailModel(

  ) {

    var Model = {
      loading: false,
      post: {},
      comments: []
    };

    return Model;
  }
})();
