(function(angular) {
  'use strict';
  angular.module('app')
    .controller('PlaceDetailController', PlaceDetailController);

  PlaceDetailController.$inject = [
    '$scope', '$state', '$q',
    'PlaceDetailModel', 'Place', 'Message', 'U', 'Preload', 'Link', 'Coupon'
  ];

  function PlaceDetailController(
    $scope, $state, $q,
    PlaceDetailModel, Place, Message, U, Preload, Link, Coupon
  ) {
    var PlaceDetail = this;
    PlaceDetail.Model = PlaceDetailModel;
    PlaceDetail.call = call;

    $scope.$on('$ionicView.beforeEnter', onBeforeEnter);
    $scope.$on('$ionicView.afterEnter', onAfterEnter);

    //====================================================
    // Initial Loading of a state;
    //====================================================
    function call() {
      return Link.call(PlaceDetailModel.place.phone);
    }

    function onBeforeEnter() {
      PlaceDetailModel.loading = true;
    }

    function onAfterEnter() {
      var placePromise;
      var couponsPromise;
      placePromise = PlaceFindOne();
      couponsPromise = CouponFind();
      $q.all([placePromise, couponsPromise])
        .then(function(array) {
          var place = array[0];
          var coupons = array[1];
          console.log("---------- place ----------");
          console.log(place);
          console.log("---------- coupons ----------");
          console.log(coupons);
          U.bindData(place, PlaceDetailModel, 'place');
          // U.bindData(couponsWrapper, PlaceDetailModel, 'coupons');
        })
        .catch(function(err) {
          U.error(err);
        });
    }

    //====================================================
    //  Implementations
    //====================================================
    function PlaceFindOne(extraQuery) {
      var queryWrapper = {
        query: {
          where: {
            id: $state.params.id
          },
          populates: ['photos']
        }
      };
      angular.extend(queryWrapper.query.where, extraQuery);
      return Place.findOne(queryWrapper).$promise
        .then(function(place) {
          var photosPromise = Preload.photos(place, 'Cloudinary400', true);
          return $q.all([place, photosPromise]);
        })
        .then(function(array) {
          var place = array[0];
          return place;
        });
    }

    function CouponFind() {
      var queryWrapper = {
        query: {
          where: {
            place: $state.params.id,
            quantity: {
              '>': 0
            }
          },
          populates: ['photos']
        }
      };
      return Coupon
        .find(queryWrapper).$promise
        .then(function(couponsWrapper) {
          var photosPromise = Preload.photos(couponsWrapper.coupons, 'Cloudinary400', true);
          return $q.all([couponsWrapper, photosPromise]);
        })
        .then(function(array) {
          var couponsWrapper = array[0];
          return couponsWrapper;
        });
    }

  } //end
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
