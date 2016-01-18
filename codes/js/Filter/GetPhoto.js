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
    .filter('GetPhoto', GetPhoto);

  GetPhoto.$inject = [];

  function GetPhoto() {
    return function(user) {
      if (user && user.photos && user.photos[0] && user.photos[0].url) {
        return user.photos[0].url;
      } else if (user && user.profile_image) {
        return user.profile_image;
      } else {
        return 'http://placehold.it/80x80';
      }
    };
  }
})(angular);
