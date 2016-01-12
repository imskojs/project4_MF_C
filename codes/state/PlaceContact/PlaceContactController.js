(function() {
  'use strict';
  angular.module('app')
    .controller('PlaceContactController', PlaceContactController);

  PlaceContactController.$inject = [
    '$state', '$scope',
    'PlaceContactModel', 'Place', 'U', 'Message'
  ];

  function PlaceContactController(
    $state, $scope,
    PlaceContactModel, Place, U, Message
  ) {
    var PlaceContact = this;
    PlaceContact.Model = PlaceContactModel;

    PlaceContact.sendForm = sendForm;

    $scope.$on('$ionicView.beforeLeave', onBeforeLeave);
    //====================================================
    //  Implementation
    //====================================================
    function sendForm() {
      Message.loading();
      Place.contactOwner({}, {
          place: $state.params.place,
          title: PlaceContactModel.title,
          content: PlaceContactModel.content
        }).$promise
        .then(function(messageWrapper) {
          console.log("---------- messageWrapper ----------");
          console.log(messageWrapper);
          return Message.alert('연락받기 알림', $state.params.name + '에 성공적으로 이메일을 보넸습니다.');
        })
        .then(function() {
          reset();
        })
        .catch(function(err) {
          U.error(err);
        });
    }

    function onBeforeLeave() {
      reset();
    }

    //====================================================
    //  Helper
    //====================================================
    function reset() {
      PlaceContactModel.form.title = '';
      PlaceContactModel.form.content = '';
      PlaceContactModel.form.phone = '';
    }
  }
})();
