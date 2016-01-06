(function() {
  'use strict';

  angular.module('app')
    .factory('DatePickerModel', DatePickerModel);

  DatePickerModel.$inject = [
    '$window', '$state',
    'Message'
  ];

  function DatePickerModel(
    $window, $state,
    Message
  ) {
    var moment = $window.moment;
    var Model = {
      dayClickHandler: function(dt) {

        var currentDate = new moment();
        currentDate.hour(0);
        if (currentDate > dt.date)
          return;


        // copies selected date then do below;
        var shopId = $state.params.id;
        console.log(shopId);

        // dt.date = 2015-08-04
        var selectedDate = moment(dt.date);

        // $state.go('main.schedule', {
        //   id: shopId,
        //   selectedDate: selectedDate.format('YYYY-MM-DD')
        // });
      }
    };

    return Model;
  }
})();
