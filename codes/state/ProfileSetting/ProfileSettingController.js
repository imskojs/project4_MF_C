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
    .controller('ProfileSettingController', ProfileSettingController);

  ProfileSettingController.$inject = [
    '$timeout', '$scope',
    'ProfileSettingModel', 'Photo', 'Message', 'U', 'AppStorage', 'User'
  ];

  function ProfileSettingController(
    $timeout, $scope,
    ProfileSettingModel, Photo, Message, U, AppStorage, User
  ) {
    var ProfileSetting = this;
    ProfileSetting.Model = ProfileSettingModel;
    var initPromise;
    $scope.$on('$ionicView.beforeEnter', onBeforeEnter);
    $scope.$on('$ionicView.afterEnter', onAfterEnter);

    ProfileSetting.getPhoto = getPhoto;
    ProfileSetting.sendForm = sendForm;
    //====================================================
    //  Implementation
    //====================================================
    function onBeforeEnter() {
      U.loading(ProfileSettingModel);
      initPromise = init();
    }

    function onAfterEnter() {
      return initPromise
        .then(function(user) {
          console.log("---------- user ----------");
          console.log(user);
          ProfileSettingModel.form.nickname = user.nickname;
          ProfileSettingModel.form.height = user.height;
          ProfileSettingModel.form.weight = user.weight;
          ProfileSettingModel.form.targetWeight = user.targetWeight;
          U.bindData(user, AppStorage, 'user', false, ProfileSettingModel);
        })
        .catch(function(err) {
          U.error(err);
        });
    }

    function getPhoto(sourceType) {
      ProfileSettingModel.imgLoading = true;
      return Photo.get(sourceType, 600, true, 300, 'square', 1)
        .then(function(base64) {
          ProfileSettingModel.form.files = [base64];
          $timeout(function() {
            ProfileSettingModel.imgLoading = false;
          }, 1000);
        })
        .catch(function(err) {
          ProfileSettingModel.imgLoading = false;
          Message.alert();
          console.log("---------- err ----------");
          console.log(err);
        });
    }

    function sendForm() {
      Message.loading();
      return Photo.post('/user/update', {
          query: {
            id: AppStorage.user.id,
            nickname: ProfileSettingModel.form.nickname,
            height: ProfileSettingModel.form.height,
            weight: ProfileSettingModel.form.weight,
            targetWeight: ProfileSettingModel.form.targetWeight
          }
        }, 'PUT')
        .then(function(updatedUserWrapper) {
          var updatedUser = updatedUserWrapper.data;
          console.log("---------- updatedUser ----------");
          console.log(updatedUser);
          AppStorage.user = updatedUser;
          return Message.alert('프로필 설정 알림', '프로필을 성공적으로 업데이트 하였습니다');
        })
        .then(function() {
          U.goBack();
        })
        .catch(function(err) {
          U.error(err);
        });
    }

    function init() {
      return findOneUser();
    }


    //====================================================
    // REST
    //====================================================
    function findOneUser() {
      var queryWrapper = {
        query: {
          id: AppStorage.user.id
        },
        populates: ['photos']
      };
      return User.findOne(queryWrapper).$promise;
    }

  }
})(angular);
