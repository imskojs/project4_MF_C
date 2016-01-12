(function(angular) {
  'use strict';
  angular.module('app', [
      'ionic',
      'applicat.push.service',
      'ngCordova',
      'ngResource',
      'ngFileUpload',
      'ngTemplates',
      'ngStorage',
      'ngImgCrop',
      "ui.bootstrap.tpls",
      "ui.bootstrap.datepicker"
    ])
    .run(init);

  init.$inject = [
    '$ionicPlatform', '$window', '$rootScope', '$state',
    'RootScope', 'Preload',
    'DEV_MODE', 'Assets'
  ];

  function init(
    $ionicPlatform, $window, $rootScope, $state,
    RootScope, Preload,
    DEV_MODE, Assets
  ) {

    Preload.assets(Assets);
    angular.extend($rootScope, RootScope);
    if (DEV_MODE) {
      setInitialState();
      // $rootScope.AppStorage.user = {
      //   id: "567a48b25c7d797246bd06c5"
      // };
    }

    $ionicPlatform.ready(onIonicPlatformReady);

    //====================================================
    //  Implementation
    //====================================================
    function onIonicPlatformReady() {
      if ($window.cordova && $window.cordova.plugins.Keyboard) {
        $window.cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if ($window.StatusBar) {
        $window.StatusBar.styleDefault();
      }
      setInitialState();
    }
    //====================================================
    //  Helper
    //====================================================
    function setInitialState() {
      if ($rootScope.AppStorage.isFirstTime && $state.get('Main.WalkThrough')) {
        // First time user logic
        $state.go('Main.WalkThrough');
      } else if (!$rootScope.AppStorage.token) {
        // Not logged in user logic
        $state.go('Main.PostEvent.EventFitMateList');
        // $state.go('Main.Home');
      } else {
        // Normal user logic
        $state.go('Main.Home');
      }
    }

  }
})(angular);
