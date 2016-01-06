(function() {
  'use strict';
  angular.module('app')
    .controller('PlaceContactController', PlaceContactController);

  PlaceContactController.$inject = [
    '$state', '$scope',
    'PlaceContactModel', 'Place', 'U'
  ];

  function PlaceContactController(
    $state, $scope,
    PlaceContactModel, Place, U
  ) {
    var PlaceContact = this;
    PlaceContact.Model = PlaceContactModel;

    PlaceContact.sendForm = sendForm;

    $scope.$on('$ionicView.beforeLeave', onBeforeLeave);
    //====================================================
    //  Implementation
    //====================================================
    function sendForm() {
      Place.contactOwner({}, {
          place: $state.params.place,
          title: PlaceContactModel.title,
          content: PlaceContactModel.content
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
      PlaceContactModel.title = '';
      PlaceContactModel.content = '';
    }
  }
})();
