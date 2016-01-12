(function() {
  'use strict';

  angular.module('app')
    .factory('EventFitMateDetailModel', EventFitMateDetailModel);

  EventFitMateDetailModel.$inject = [

  ];

  function EventFitMateDetailModel(

  ) {

    var Model = {
      loading: false,
      post: {},
      comments: []
    };

    return Model;
  }
})();
