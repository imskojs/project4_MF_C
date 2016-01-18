(function(angular) {
  'use strict';
  angular.module('app')
    .factory('Coupon', Coupon);

  Coupon.$inject = [
    '$resource',
    'SERVER_URL'
  ];

  function Coupon(
    $resource,
    SERVER_URL
  ) {

    var couponUrl = SERVER_URL + '/coupon' +
      '/:find' +
      '/:findOne' +
      '/:create' +
      '/:update' +
      '/:updatePassword' +
      '/:use' +
      '/:destroy';

    var params = {
      find: '@find',
      findOne: '@findOne',
      create: '@create',
      update: '@update',
      destroy: '@destroy',
      updatePassword: '@updatePassword',
      use: '@use'
    };

    var actions = {
      find: {
        method: 'GET',
        params: {
          find: 'find'
        }
      },
      findOne: {
        method: 'GET',
        params: {
          findOne: 'findOne'
        }
      },
      create: {
        method: 'POST',
        params: {
          create: 'create'
        }
      },
      update: {
        method: 'PUT',
        params: {
          update: 'update'
        }
      },
      updatePassword: {
        method: 'PUT',
        params: {
          updatePassword: 'updatePassword'
        }
      },
      use: {
        method: 'PUT',
        params: {
          use: 'use'
        }
      },
      destroy: {
        method: 'DELETE',
        params: {
          destroy: 'destroy'
        }
      }
    };

    var service = $resource(couponUrl, params, actions);

    return service;

  }
})(angular);
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
