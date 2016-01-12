(function(angular) {
  'use strict';

  angular.module('app')
    .factory('ProfileSettingModel', ProfileSettingModel);

  ProfileSettingModel.$inject = [
    'Locations'
  ];

  function ProfileSettingModel(
    Locations
  ) {

    var Model = {
      imgLoading: false,
      loading: false,
      form: {
        files: [],
        nickname: null,
        // location: null,
        height: null,
        weight: null,
        targetWeight: null
      },
      locations: Locations
    };

    return Model;
  }
})(angular);



/**
 * Created by Applicat - DevTeam on 05/01/16
 * As part of MyFitMate
 *
 * Copyright (C) Applicat (www.applicat.co.kr) - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Maengkwan Seo <hbnb7894@gmail.com>, 05/01/16
 *
 */
