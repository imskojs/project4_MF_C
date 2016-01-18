(function(angular) {
  'use strict';
  angular.module('app')
    .controller('PlaceDetailController', PlaceDetailController);

  PlaceDetailController.$inject = [
    '$scope', '$state', '$q', '$rootScope',
    'PlaceDetailModel', 'Place', 'Message', 'U', 'Preload', 'Link', 'Coupon'
  ];

  function PlaceDetailController(
    $scope, $state, $q, $rootScope,
    PlaceDetailModel, Place, Message, U, Preload, Link, Coupon
  ) {
    var PlaceDetail = this;
    PlaceDetail.Model = PlaceDetailModel;
    var initPromise;
    var noLoadingStates = ['Main.PlaceContact', 'Main.BookingList', 'Main.CouponDetail'];
    $scope.$on('$ionicView.beforeEnter', onBeforeEnter);
    $scope.$on('$ionicView.afterEnter', onAfterEnter);

    PlaceDetail.call = call;
    PlaceDetail.refresh = refresh;
    PlaceDetail.createCoupon = function() {
      return Coupon.create({}, {
          title: 'test title',
          content: 'test content',
          quantity: 90,
          password: 1234,
          place: $state.params.id
        }).$promise
        .then(function(coupon) {
          console.log("---------- coupon ----------");
          console.log(coupon);
        })
        .catch(function(err) {
          console.log("---------- err ----------");
          console.log(err);
        });
    };

    //====================================================
    // Initial Loading of a state;
    //====================================================
    function onBeforeEnter() {
      if (!U.areSiblingViews(noLoadingStates)) {
        U.loading(PlaceDetailModel);
        initPromise = init();
      }
    }

    function onAfterEnter() {
      if (!U.areSiblingViews(noLoadingStates)) {
        initPromise
          .then(function(array) {
            var place = array[0];
            var couponsWrapper = array[1];
            console.log("---------- place ----------");
            console.log(place);
            console.log("---------- coupons ----------");
            console.log(couponsWrapper);
            U.bindData(place, PlaceDetailModel, 'place');
            U.bindData(couponsWrapper, PlaceDetailModel, 'coupons', true);
          })
          .catch(function(err) {
            U.error(err);
          });
      } else {
        U.freeze(false);
        $rootScope.$broadcast('$rootScope:bindDataComplete');
      }
    }

    function call() {
      var number = '' + PlaceDetailModel.place.phone;
      return Link.call('0' + number);
    }

    function refresh() {
      init()
        .then(function(array) {
          var place = array[0];
          var couponsWrapper = array[1];
          U.bindData(place, PlaceDetailModel, 'place');
          U.bindData(couponsWrapper, PlaceDetailModel, 'coupons');
        })
        .catch(function(err) {
          U.error(err);
        })
        .finally(function() {
          U.broadcast($scope);
        });
    }


    function init() {
      var placePromise = PlaceFindOne();
      var couponsPromise = CouponFind();
      return $q.all([placePromise, couponsPromise]);
    }
    //====================================================
    // REST 
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
          var photosPromise = Preload.photos(place, 'Cloudinary400', true, 'neverMind');
          return $q.all([place, photosPromise]);
        })
        .then(function(array) {
          var place = array[0];
          return place;
        });
    }

    function CouponFind(extraQuery) {
      var queryWrapper = {
        query: {
          where: {
            place: $state.params.id,
            // quantity: {
            //   '>': 0
            // }
          },
          populates: ['photos']
        }
      };
      angular.extend(queryWrapper.query.where, extraQuery);
      return Coupon
        .find(queryWrapper).$promise
        .then(function(couponsWrapper) {
          var photosPromise = Preload.photos(couponsWrapper.coupons, 'Cloudinary400', true, 'neverMind');
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
