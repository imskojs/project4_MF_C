(function() {
  'use strict';
  angular.module('app')
    .controller('DatePickerController', DatePickerController);

  DatePickerController.$inject = [
    '$window',
    'DatePickerModel'
  ];

  function DatePickerController(
    $window,
    DatePickerModel
  ) {
    var moment = $window.moment;
    var DatePicker = this;
    DatePicker.Model = DatePickerModel;


    DatePicker.disablePast = disablePast;
    //====================================================
    //  Implementation
    //====================================================
    function disablePast(date) {
      console.log("---------- date ----------");
      console.log(date);
      var currentDate = moment();
      return currentDate > date;
    }
  }
})();
