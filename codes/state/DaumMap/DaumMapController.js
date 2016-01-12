(function() {
  'use strict';

  angular.module('app')
    .controller('DaumMapController', DaumMapController);

  DaumMapController.$inject = [
    'DaumMapModel', 'Message', 'U',
    '$ionicModal', '$scope', '$state', '$stateParams', '$timeout', '$window', '$rootScope'
  ];

  function DaumMapController(
    DaumMapModel, Message, U,
    $ionicModal, $scope, $state, $stateParams, $timeout, $window, $rootScope
  ) {

    var daum = $window.daum;
    var DaumMap = this;
    DaumMap.Model = DaumMapModel;
    var noLoadingStates = ['Main.PlaceDetail'];

    DaumMap.searchType = "address";
    DaumMap.goToState = goToState;



    DaumMap.findMeThenSearchNearBy = DaumMapModel.findMeThenSearchNearBy;
    DaumMap.searchLocationNearBy = DaumMapModel.searchLocationNearBy;
    $scope.$on('$ionicView.enter', onEnter);
    $scope.$on('$ionicView.afterEnter', onAfterEnter);

    //====================================================
    // Implementation
    //====================================================
    function goToState(state, params) {
      DaumMapModel.modal.hide();
      $rootScope.goToState(state, params, 'forward');

    }

    function onEnter() {
      // if ($stateParams.id) {
      //   DaumMapModel.findPlaceByIdThenDrawAPlace($stateParams.id);
      // }
    }

    function onAfterEnter() {
      if(!U.areSiblingViews(noLoadingStates)){
        $timeout(function() {
          DaumMapModel.domMap.relayout();
        }, 20);
        var latitude;
        var longitude;
        if ($state.params.id) {
          DaumMapModel.findPlaceByIdThenDrawAPlace($stateParams.id);
        } else if (DaumMapModel.selectedPlace.geoJSON &&
          DaumMapModel.selectedPlace.geoJSON.coordinates) {
          latitude = DaumMapModel.selectedPlace.geoJSON.coordinates[1];
          longitude = DaumMapModel.selectedPlace.geoJSON.coordinates[0];
          DaumMapModel.domMap.panTo(new daum.maps.LatLng(latitude + 0.01, longitude + 0.01));
          DaumMapModel.domMap.panTo(new daum.maps.LatLng(latitude - 0.01, longitude - 0.01));
        }
      }
    }

    //====================================================
    //  Modals
    //====================================================
    $ionicModal.fromTemplateUrl('state/DaumMap/PlaceModal.html', {
        scope: $scope,
        animation: 'slide-in-up'
      })
      .then(function(modal) {
        DaumMapModel.modal = modal;
      });
  }
})();
