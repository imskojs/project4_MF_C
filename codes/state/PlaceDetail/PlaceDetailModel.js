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
    .factory('PlaceDetailModel', PlaceDetailModel);

  PlaceDetailModel.$inject = [
    'U'
  ];

  function PlaceDetailModel(
    U
  ) {

    var model = {
      loading: true,
      loadPhoto: false,
      place: {
        title: 'test',
        content: 'test test',
        createdAt: null,
        photos: [],
        geoJSON: {
          coordinates: []
        }
      },
      coupons: [{
        id: 10,
        photos: [{
          id: 0,
          url: 'http://placehold.it/400x400'
        }],
        title: '파워퓌트니스',
        content: '휘트니스 한달 이용권 10% 할인',
        expirationDate: new Date(),
        totalQuantity: 20,
        usedQuantity: 15,
        quantity: 5
      }, {
        id: 11,
        photos: [{
          id: 0,
          url: 'http://placehold.it/400x400'
        }],
        title: '파워퓌트니스1',
        content: '휘트니스 한달 이용권 10% 할인 1',
        expirationDate: new Date(),
        totalQuantity: 20,
        usedQuantity: 5,
        quantity: 15
      }],
      //  From uiDatePicker
      selectedDate: {},
      dayClickHandler: dayClickHandler
    };

    return model;

    //====================================================
    //  
    //====================================================
    function dayClickHandler(dt /*: Date*/ ) {
      U.goToState('Main.BookingList', {
        date: dt.date
      }, 'forward');
    }
  }
})(angular);
