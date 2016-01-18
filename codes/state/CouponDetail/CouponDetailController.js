(function(angular) {
  'use strict';
  angular.module('app')
    .controller('CouponDetailController', CouponDetailController);

  CouponDetailController.$inject = [
    '$scope', '$ionicModal', '$state', '$q',
    'CouponDetailModel', 'Coupon', 'Preload', 'U', 'AppStorage', 'Message'
  ];

  function CouponDetailController(
    $scope, $ionicModal, $state, $q,
    CouponDetailModel, Coupon, Preload, U, AppStorage, Message
  ) {

    var CouponDetail = this;
    CouponDetail.Model = CouponDetailModel;
    var initPromise;
    var noLoadingStates = [];
    CouponDetail.closeModal = closeModal;

    $scope.$on('$ionicView.beforeEnter', onBeforeEnter);
    $scope.$on('$ionicView.afterEnter', onAfterEnter);
    $scope.$on('modal.hidden', function() {
      console.log("---------- 'test' ----------");
      console.log('test');
      CouponDetailModel.form.password = '';
    });

    // In Modal;
    CouponDetail.useCoupon = useCoupon;
    //====================================================
    //  Implementation
    //====================================================
    function onBeforeEnter() {
      if (!U.hasPreviousStates(noLoadingStates)) {
        U.loading(CouponDetailModel);
        initPromise = init();
      }
    }

    function onAfterEnter() {
      if (!CouponDetail.modal) {
        createModal();
      }
      if (!U.hasPreviousStates(noLoadingStates)) {
        return initPromise
          .then(function(coupon) {
            U.bindData(coupon, CouponDetailModel, 'coupon');
          })
          .catch(function(err) {
            U.error(err);
          });
      }
    }
    //====================================================
    //  Modal
    //====================================================
    function createModal() {
      $ionicModal.fromTemplateUrl('state/CouponDetail/Modal/CouponModal.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function(modal) {
        CouponDetail.modal = modal;
      });
    }


    function closeModal() {
      CouponDetail.modal.hide();
    }

    //====================================================
    //  Helper
    //====================================================
    function init() {
      return findOne();
    }

    function useCoupon() {
      Message.loading();
      use()
        .then(function() {
          CouponDetail.modal.hide();
          Message.alert('쿠폰사용 알림', '쿠폰을 성공적으로 사용하였습니다.');
        })
        .catch(function(err) {
          CouponDetail.modal.hide();
          if (err.data.message === '0 quantity left') {
            return Message.alert('쿠폰사용 알림', '전부 사용한 쿠폰입니다.');
          }
        })
        .finally(function() {
          CouponDetail.modal.hide();
        });
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
          var photosPromise = Preload.photos(coupon, 'Cloudinary600', true);
          return $q.all([coupon, photosPromise]);
        })
        .then(function(array) {
          var coupon = array[0];
          return coupon;
        });
    }

    function use() {
      var queryWrapper = {
        query: {
          id: $state.params.id,
          password: CouponDetailModel.form.password,
          usedBy: AppStorage.user.id
        }
      };
      return Coupon
        .use(queryWrapper).$promise
        .then(function(coupon) {
          return coupon;
        });

    }

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
