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
      if (input === 'faq') {
        return '자주 묻는 질문';
      } else if (input === 'notification') {
        return '공지사항';
      } else if (input === 'high') {
        return '상';
      } else if (input === 'medium') {
        return '중';
      } else if (input === 'low') {
        return '하';
      }
    };
  }
})(angular);
