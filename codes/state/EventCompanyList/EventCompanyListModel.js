(function() {
  'use strict';

  angular.module('app')
    .factory('EventCompanyListModel', EventCompanyListModel);

  EventCompanyListModel.$inject = [

  ];

  function EventCompanyListModel(

  ) {

    var Model = {
      loading: false,
      posts: []
    };

    return Model;
  }
})();
