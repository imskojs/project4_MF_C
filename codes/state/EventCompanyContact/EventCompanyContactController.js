(function() {
  'use strict';
  angular.module('app')
    .controller('EventCompanyContactController', EventCompanyContactController);

  EventCompanyContactController.$inject = [
    '$state', '$scope',
    'EventCompanyContactModel', 'User', 'U', 'Message', 'AppStorage'
  ];

  function EventCompanyContactController(
    $state, $scope,
    EventCompanyContactModel, User, U, Message, AppStorage
  ) {
    var EventCompanyContact = this;
    EventCompanyContact.Model = EventCompanyContactModel;

    EventCompanyContact.sendForm = sendForm;

    $scope.$on('$ionicView.beforeLeave', onBeforeLeave);
    //====================================================
    //  Implementation
    //====================================================
    function sendForm() {
      Message.loading();
      return contactAdmin()
        .then(function(messageWrapper) {
          console.log("---------- messageWrapper ----------");
          console.log(messageWrapper);
          return Message.alert('이벤트 문의 알림', '이벤트 문의가 관리자에게 성공적으로 접수되었습니다.');
        })
        .then(function() {
          reset();
          U.goBack();
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
      EventCompanyContactModel.form.title = '';
      EventCompanyContactModel.form.content = '';
    }

    //====================================================
    //  REST
    //====================================================
    function contactAdmin() {
      return User.contactAdmin({}, {
          from: AppStorage.user.email || 'hongGilDong@hongGilDong.com',
          title: EventCompanyContactModel.form.title,
          content: EventCompanyContactModel.form.content
        }).$promise
        .then(function(messageWrapper) {
          return messageWrapper;
        });
    }
  }
})();
