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
    .factory('SampleDetailModel', SampleDetailModel);

  SampleDetailModel.$inject = [];

  function SampleDetailModel() {

    var model = {
      post: {
        title: 'test',
        content: 'test test',
        createdAt: null,
      }
    };
    return model;
  }
})(angular);
