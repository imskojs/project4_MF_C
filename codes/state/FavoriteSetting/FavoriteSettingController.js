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

(function(angular) {
  'use strict';
  angular.module('app')
    .controller('FavoriteSettingController', FavoriteSettingController);

  FavoriteSettingController.$inject = [
    'FavoriteSettingModel', 'Infos'
  ];

  function FavoriteSettingController(
    FavoriteSettingModel, Infos
  ) {

    /***********************************
     *           Initialisation
     ***********************************/

    var FavoriteSetting = this;
    FavoriteSetting.Model = FavoriteSettingModel;

    FavoriteSetting.Infos = Infos;
    FavoriteSetting.Info = FavoriteSetting.Infos[0];

    /***********************************
     *           Declaration
     ***********************************/

    /***********************************
     *           Implementation
     ***********************************/
  }
})(angular);
