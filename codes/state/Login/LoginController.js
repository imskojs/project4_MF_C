/**
 * Created by Applicat - DevTeam on 05/01/16
 * As part of MyFitMate
 *
 * Copyright (C) Applicat (www.applicat.co.kr) - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Maengkwan Seo <hbnb7894@gmail.com>, 05/01/16
 *
 */

(function(angular) {
  'use strict';
  angular.module('app')
    .controller('LoginController', LoginController);

  LoginController.$inject = [
    '$state', '$http', '$cordovaOauth',
    'LoginModel', 'AppStorage', 'Message', 'U',
    'FACEBOOK_KEY', 'KAKAO_KEY', 'SERVER_URL'
  ];

  function LoginController(
    $state, $http, $cordovaOauth,
    LoginModel, AppStorage, Message, U,
    FACEBOOK_KEY, KAKAO_KEY, SERVER_URL
  ) {
    var Login = this;
    Login.Model = LoginModel;

    Login.loginWithFacebook = loginWithFacebook;
    Login.loginWithKakao = loginWithKakao;
    //====================================================
    //  Implementation
    //====================================================

    //====================================================
    //  REST
    //====================================================
    // 'POST /user/loginWithOauth': 'AuthController.registerPassport',
    function loginWithFacebook() {
      Message.loading();
      return $cordovaOauth.facebook(FACEBOOK_KEY, ['email', 'public_profile'])
        .then(function(result) {
          result.provider = 'facebook';
          console.log("---------- result ----------");
          console.log(result);
          return $http({
            url: SERVER_URL + '/user/loginWithOauth',
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            data: result
          });
        })
        .then(function(userWrapper) {
          console.log("---------- userWrapper ----------");
          console.log(userWrapper);
          userWrapper = userWrapper.data;
          AppStorage.user = userWrapper.user;
          AppStorage.token = userWrapper.token;
          U.goToState('FavoriteSetting');
        })
        .catch(function(err) {
          console.log("---------- err ----------");
          console.log(err);
          Message.alert('페이스북 로그인 알림', '페이스북 로그인을 실패하였습니다. 다시 시도해주세요.');
        });
    }

    function loginWithKakao() {
      console.log("---------- KAKAO_KEY ----------");
      console.log(KAKAO_KEY);
      return $cordovaOauth.kakao(KAKAO_KEY)
        .then(function(result) {
          result.provider = 'kakao';
          console.log("---------- result ----------");
          console.log(result);
          return $http({
            url: SERVER_URL + '/user/loginWithOauth',
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            data: result
          });
        })
        .then(function(userWrapper) {
          console.log("---------- userWrapper ----------");
          console.log(userWrapper);
          userWrapper = userWrapper.data;
          AppStorage.user = userWrapper.user;
          AppStorage.token = userWrapper.token;
          U.goToState('FavoriteSetting');
        })
        .catch(function(err) {
          console.log("---------- err ----------");
          console.log(err);
          Message.alert('카카오 로그인 알림', '카카오 로그인을 실패하였습니다. 다시 시도해주세요.');
        });

    }

  }
})(angular);
