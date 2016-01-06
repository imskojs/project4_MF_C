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
    .factory('Post', Post);

  Post.$inject = [
    '$resource',
    'SERVER_URL'
  ];

  function Post(
    $resource,
    SERVER_URL
  ) {

    var postUrl = SERVER_URL + '/post' +
      '/:find' +
      '/:findOne' +
      '/:create' +
      '/:update' +
      '/:destroy';

    var params = {
      find: '@find',
      findOne: '@findOne',
      create: '@create',
      update: '@update',
      destroy: '@destroy'
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
      destroy: {
        method: 'DELETE',
        params: {
          destroy: 'destroy'
        }
      }
    };

    var service = $resource(postUrl, params, actions);

    return service;

  }
})(angular);
