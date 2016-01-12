(function() {
  'use strict';

  angular.module('app')
    .factory('EventFitMateListModel', EventFitMateListModel);

  EventFitMateListModel.$inject = [

  ];

  function EventFitMateListModel(

  ) {

    var Model = {
      loading: false,
      posts: []
    };

    return Model;
  }
})();
