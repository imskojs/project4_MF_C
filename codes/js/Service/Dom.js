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
    .factory('Dom', Dom);

  Dom.$inject = ['$timeout', '$window'];

  function Dom($timeout, $window) {
    var service = {
      focusById: focusById,
      blurById: blurById,
    };

    return service;

    // USAGE;
    // <input id="daum-map-search-input" type="text">
    // Dom.focusById('daum-map-search-input');
    function focusById(id) {
      $timeout(function() {
        var domElement = $window.document.getElementById(id);
        if (domElement) {
          domElement.focus();
        }
      }, 0);
    }

    function blurById(id) {
      $timeout(function() {
        var domElement = $window.document.getElementById(id);
        if (domElement) {
          domElement.blur();
        }
      }, 0);
    }
  }

})(angular);
