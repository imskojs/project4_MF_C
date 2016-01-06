(function() {
  'use strict';
  angular.module('app')
    .factory('DaumMapModel', DaumMapModel);

  function DaumMapModel() {
    var model = {
      lastCenter: {
        longitude: null,
        latitude: null
      },
      markers: [],
      selectedPlace: {},
      currentPosition: {
        latitude: null,
        longitude: null
      },
      places: [],
      modal: {},
      findMeThenSearchNearBy: function() {},
      searchLocationNearBy: function() {},
      filterByEvent: false
    };

    return model;
  }
})();
