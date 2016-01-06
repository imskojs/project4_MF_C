/**
 * Created by Seunghoon Ko on 10/10/2015
 * As part of applicat platform
 *
 * Copyright (C) Applicat (www.applicat.co.kr) & Seunghoon Ko - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Seunghoon Ko <imskojs@gmail.com>, 10/10/2015
 *
 */
(function(angular) {
  'use strict';

  angular.module('app')
    .factory('AppStorage', AppStorage);

  AppStorage.$inject = [
    '$localStorage',
    'APP_NAME'
  ];

  function AppStorage(
    $localStorage,
    APP_NAME
  ) {

    setInitialState();

    return $localStorage[APP_NAME];

    //====================================================
    //  Implementations
    //====================================================
    function setInitialState() {
      if (!$localStorage[APP_NAME]) {
        $localStorage[APP_NAME] = {};
      }
      var storage = $localStorage[APP_NAME];
      if (storage.isFirstTime === undefined) {
        storage.isFirstTime = true;
      }
    }

    //====================================================
    //  Helper
    //====================================================
  }
})(angular);
