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
    .controller('ReservationListController', ReservationListController);

  ReservationListController.$inject = [
    '$scope', '$ionicModal',
    'ReservationListModel'
  ];

  function ReservationListController(
    $scope, $ionicModal,
    ReservationListModel
  ) {

    /***********************************
     *           Initialisation
     ***********************************/

    var ReservationList = this;
    ReservationList.Model = ReservationListModel;

    $scope.$on('$ionicView.enter', onEnter);
    /***********************************
     *           Declaration
     ***********************************/

    ReservationList.openModal = openModal;
    ReservationList.closeModal = closeModal;

    function onEnter() {
      // DEV MODE
      openModal();
    }
    /***********************************
     *           Implementation
     ***********************************/


    /***********************************
     *           Modal
     ***********************************/

    $ionicModal.fromTemplateUrl('state/ReservationList/Modal/ReservationModal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });

    function openModal() {
      $scope.modal.show();
    }

    function closeModal(){
      $scope.modal.hide();
    }
  }
})(angular);
