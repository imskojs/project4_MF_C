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
    '$timeout',
    'ProfileSettingModel', 'Photo', 'Message'
  ];

  function ProfileSettingController(
    $timeout,
    ProfileSettingModel, Photo, Message
  ) {
    var ProfileSetting = this;
    ProfileSetting.Model = ProfileSettingModel;

    ProfileSetting.getPhoto = getPhoto;
    ProfileSetting.sendForm = sendForm;
    //====================================================
    //  Implementation
    //====================================================
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
      return Photo.post('/user/update', ProfileSettingModel.form, 'PUT');
    }


    //====================================================
    //  Helper
    //====================================================

  }
})(angular);
