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
    .factory('SampleListModel', SampleListModel);

  SampleListModel.$inject = [];

  function SampleListModel() {

    var model = {
      posts: [{
        id: 'test1',
        title: '첫번째 공지사항',
        createdAt: new Date()
      }, {
        id: 'test2',
        title: '두번째 공지사항',
        createdAt: new Date()
      }],
      more: false
    };
    return model;
  }
})(angular);
