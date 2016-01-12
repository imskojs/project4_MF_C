(function() {
  'use strict';
  angular.module('app')
    .controller('EventCompanyContactController', EventCompanyContactController);

  EventCompanyContactController.$inject = [
    '$state', '$scope',
    'EventCompanyContactModel', 'Place', 'U'
  ];

  function EventCompanyContactController(
    $state, $scope,
    EventCompanyContactModel, Place, U
  ) {
    var EventCompanyContact = this;
    EventCompanyContact.Model = EventCompanyContactModel;

    EventCompanyContact.sendForm = sendForm;

    $scope.$on('$ionicView.beforeLeave', onBeforeLeave);
    //====================================================
    //  Implementation
    //====================================================
    function sendForm() {
      Place.contactOwner({}, {
          place: $state.params.place,
          title: EventCompanyContactModel.title,
          content: EventCompanyContactModel.content
        }).$promise
        .then(function(messageWrapper) {
          console.log("---------- messageWrapper ----------");
          console.log(messageWrapper);
        })
        .catch(function(err) {
          U.error(err);
        });
    }

    function onBeforeLeave() {
      EventCompanyContactModel.title = '';
      EventCompanyContactModel.content = '';
    }
  }
})();
