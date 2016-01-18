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
    .filter('AppText', AppText);

  AppText.$inject = [];

  function AppText() {
    return function(input) {
      if (input === '헬스/트레이닝') {
        return 'HEALTH-CLUB';
      } else if (input === '에어로빅') {
        return 'AEROBIC-CLUB';
      } else if (input === '필라테스') {
        return 'PILATES-CLUB';
      } else if (input === '요가') {
        return 'YOGA-CLUB';
      } else if (input === '복싱') {
        return 'BOXING-CLUB';
      } else if (input === '클라이밍') {
        return 'CLIMBING-CLUB';
      }
    };
  }
})(angular);
