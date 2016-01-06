(function() {
  'use strict';
  angular.module('app')
    .controller('EventFitMateWrtieController', EventFitMateWrtieController);

  EventFitMateWrtieController.$inject = [
    'EventFitMateWrtieModel'
  ];

  function EventFitMateWrtieController(
    EventFitMateWrtieModel
  ) {

    var EventFitMateWrtie = this;
    EventFitMateWrtie.Model = EventFitMateWrtieModel;

  }
})();
