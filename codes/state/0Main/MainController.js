(function(angular) {
  'use strict';
  angular.module('app')
    .controller('MainController', MainController);

  MainController.$inject = [
    '$rootScope', '$scope', '$state', '$ionicSideMenuDelegate', '$ionicModal', '$cordovaSocialSharing',
    'MainModel', 'AppStorage'
  ];

  function MainController(
    $rootScope, $scope, $state, $ionicSideMenuDelegate, $ionicModal, $cordovaSocialSharing,
    MainModel, AppStorage
  ) {

    var Main = this;
    Main.Model = MainModel;

    Main.logout = logout;
    //====================================================
    //  Implementation
    //====================================================
    function logout(stateAfterLogout) {
      AppStorage = {
        isFirstTime: true
      };
      $ionicSideMenuDelegate.toggleLeft(false);
      $state.go(stateAfterLogout);
    }


    //====================================================
    //  Modal
    //====================================================
    // $ionicModal.fromTemplateUrl('state/Main/Modal/RequestLoginModal.html', {
    //   scope: $scope,
    //   animation: 'mh-slide'
    // }).then(function(modal) {
    //   Main.RequestLoginModal = modal;
    // });
  }
})(angular);
