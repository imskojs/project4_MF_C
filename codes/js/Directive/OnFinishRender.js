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
    .directive('onFinishRender', onFinishRender);

  onFinishRender.$inject = ['$timeout'];

  function onFinishRender($timeout) {
    return {
      restrict: 'A',
      link: link
    };

    function link(scope) {
      if (scope.$last === true) {
        $timeout(function() {
          scope.$emit('ngRepeatFinished');
        });
      }
    }
  }
})(angular);
