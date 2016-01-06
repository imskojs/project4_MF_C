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
// Calls a specified function when enter is pressed on input
// Usage
// <input ng-enter="vm.myFunction()"></input>
(function(angular) {
  'use strict';
  angular.module('app')
    .directive('ngEnter', ngEnter);

  ngEnter.$inject = ['$window'];

  function ngEnter($window) {
    return function(scope, element, attrs) {
      element.bind("keydown keypress", function(event) {
        if (event.which === 13) {
          scope.$apply(function() {
            scope.$eval(attrs.ngEnter);
          });
          if ($window.cordova) {
            $window.cordova.plugins.Keyboard.close();
          }
          event.preventDefault();
        }
      });
    };
  }
})(angular);
