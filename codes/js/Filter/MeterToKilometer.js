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
    .filter('MeterToKilometer', MeterToKilometer);

  MeterToKilometer.$inject = [];

  function MeterToKilometer() {
    return function(input) {
      if (input >= 1000) {
        return (input / 1000).toFixed(2) + ' km';
      } else if (input === undefined) {
        return '0 m';
      } else {
        return input + ' m';
      }
    };
  }
})(angular);
