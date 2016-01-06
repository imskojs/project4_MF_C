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
// Input:
//p1, p2, where p1,p2 = {latitude: float, longitude: float}

// Usage
// Distance.between({latitude: 33, longitude: 33}, {latitude: 44, longitude:44});

// Output: distance between two points in meters.
// 20000
(function(angular) {
  'use strict';

  angular.module('app')
    .factory('Distance', Distance);

  Distance.$inject = ['$window'];

  function Distance($window) {

    var service = {
      between: $window.geolib.getDistance
    };

    return service;

  }
})(angular);
