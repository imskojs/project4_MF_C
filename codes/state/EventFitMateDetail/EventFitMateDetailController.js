(function() {
  'use strict';
  angular.module('app')
    .controller('EventFitMateDetailController', EventFitMateDetailController);

  EventFitMateDetailController.$inject = [
    'EventFitMateDetailModel'
  ];

  function EventFitMateDetailController(
    EventFitMateDetailModel
  ) {

    var EventFitMateDetail = this;
    EventFitMateDetail.Model = EventFitMateDetailModel;

  }
})();
