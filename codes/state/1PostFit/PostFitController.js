(function() {
  'use strict';
  angular.module('app')
    .controller('PostFitController', PostFitController);

  PostFitController.$inject = [
    '$scope',
    'PostFitModel', 'Locations'
  ];

  function PostFitController(
    $scope,
    PostFitModel, Locations
  ) {
    var PostFit = this;
    PostFit.Model = PostFitModel;

    PostFit.Model.Locations = Locations;
    PostFit.Model.Location = PostFit.Model.Locations[0];
    PostFit.LocationChanged = LocationChanged;

    //====================================================
    // Implementation
    //====================================================

    function LocationChanged() {
      $scope.$broadcast('PostFit:LocationChanged');
    }
  }
})();
