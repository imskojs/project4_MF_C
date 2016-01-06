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
    .controller('BookingListController', BookingListController);

  BookingListController.$inject = [
    '$scope', '$ionicModal', '$state',
    'BookingListModel'
  ];

  function BookingListController(
    $scope, $ionicModal, $state,
    BookingListModel
  ) {

    /***********************************
     *           Initialisation
     ***********************************/

    var BookingList = this;
    BookingList.Model = BookingListModel;

    $scope.$on('$ionicView.enter', onEnter);
    /***********************************
     *           Declaration
     ***********************************/

    BookingList.openModal = openModal;
    BookingList.closeModal = closeModal;

    function onEnter() {
      // DEV MODE
      console.log("---------- $state.params.date ----------");
      console.log($state.params.date);
      // openModal();
    }
    /***********************************
     *           Implementation
     ***********************************/


    /***********************************
     *           Modal
     ***********************************/

    $ionicModal.fromTemplateUrl('state/BookingList/Modal/BookingModal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      BookingList.modal = modal;
    });

    function openModal() {
      BookingList.modal.show();
    }

    function closeModal() {
      BookingList.modal.hide();
    }
  }
})(angular);
