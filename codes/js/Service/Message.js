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
    .factory('Message', Message);

  Message.$inject = [
    '$ionicLoading', '$ionicPopup'
  ];

  function Message(
    $ionicLoading, $ionicPopup
  ) {
    var service = {
      loading: loadingDefault,
      hide: loadingHide,
      success: messageSuccess,
      error: messageError,
      alert: popUpAlertDefault
    };

    return service;

    function loadingDefault(message) {
      $ionicLoading.show(message);
    }

    function messageSuccess(message) {
      $ionicLoading.show({
        template: '<h4 class="message-success">' + message + '</h4>',
        duration: 2000
      });
    }

    function messageError(message) {
      $ionicLoading.show({
        template: '<h4 class="message-error">' + message + '</h4>',
        duration: 2000
      });
    }

    function loadingHide() {
      $ionicLoading.hide();
    }

    function popUpAlertDefault(title, message) {
      loadingHide();
      return $ionicPopup.alert({
        title: title || '인터넷이 끊겼습니다.',
        template: message || '인터넷을 켜주세요.'
      });
    }


  }


})(angular);
