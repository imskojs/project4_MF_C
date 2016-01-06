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
// Makes width of the view available as JS or directive such as collection repeat
// This makes collection repeat to have dynamic width or height which depends on
//the view width or view height;

// usage:
// Required: IndexModel.vw = INT;
// In index.html, body[vw]
// 1) ion-list>ion-item[collection-repeat="item in items" item-height="vw * 0.20"]
// 2) ANY[vw]
// 3) function controller(IndexModel){
//     console.log(IndexModel.vw);
//    }
(function(angular) {
  'use strict';

  angular.module('app')
    .directive('vw', vw);

  vw.$inject = ['$rootScope', '$window'];

  function vw($rootScope, $window) {
    return {
      link: link
    };

    function link(scope, element) {
      $rootScope.vw = element.prop('offsetWidth');

      $window.addEventListener('resize', function() {
        $rootScope.$apply(function() {
          $rootScope.vw = element.prop('offsetWidth');
        });
      });
    }
  }


})(angular);
