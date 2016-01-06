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
    .controller('CouponDetailController', CouponDetailController);

  CouponDetailController.$inject = [
    '$scope', '$ionicModal', '$state', '$q',
    'CouponDetailModel', 'Coupon', 'Preload', 'U'
  ];

  function CouponDetailController(
    $scope, $ionicModal, $state, $q,
    CouponDetailModel, Coupon, Preload, U
  ) {

    var CouponDetail = this;
    CouponDetail.Model = CouponDetailModel;

    CouponDetail.usingCoupon = usingCoupon;
    CouponDetail.closeModal = closeModal;

    $scope.$on('$ionicView.afterEnter', onAfterEnter);
    //====================================================
    //  Implementation
    //====================================================
    function onAfterEnter() {
      createModal();
      findOne()
        .then(function(coupon) {
          U.bindData(coupon, CouponDetailModel, 'coupon');
        })
        .catch(function(err) {
          U.error(err);
        });
    }


    //====================================================
    //  Helper
    //====================================================



    //====================================================
    //  Modal
    //====================================================
    function createModal() {
      $ionicModal.fromTemplateUrl('state/CouponDetail/Modal/CouponModal.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function(modal) {
        $scope.modal = modal;
      });
    }

    function usingCoupon() {
      $scope.modal.show();
    }

    function closeModal() {
      $scope.modal.hide();
    }


    //====================================================
    //  REST
    //====================================================
    function findOne() {
      var queryWrapper = {
        query: {
          where: {
            id: $state.params.id
          },
          populates: ['photos']
        }
      };
      return Coupon
        .findOne(queryWrapper).$promise
        .then(function(coupon) {
          var photosPromise = Preload.photos(coupon, 'Cloudinary400', true);
          return $q.all([coupon, photosPromise]);
        })
        .then(function(array) {
          var coupon = array[0];
          return coupon;
        });
    }



  }
})(angular);
