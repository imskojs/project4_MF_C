//==========================================================================
//              Style for user selection.
//==========================================================================

(function(angular) {
  'use strict';

  angular.module('app')
    .directive('staticDaumMap', staticDaumMap);

  staticDaumMap.$inject = ['$timeout', '$window'];

  function staticDaumMap($timeout, $window) {
    var daum = $window.daum;
    return {
      restrict: 'A',
      link: link
    };

    function link(scope, element, attrs) {
      var DOM = element[0];
      var marker = {
        position: new daum.maps.LatLng(Number(attrs.latitude), Number(attrs.longitude))
      };
      var staticMapOption = {
        center: new daum.maps.LatLng(Number(attrs.latitude), Number(attrs.longitude)),
        level: 4,
        marker: marker
      };
      $timeout(function() {
        var staticMap = new daum.maps.StaticMap(DOM, staticMapOption);
        console.log(staticMap);
      }, 100);
    }
  }

})(angular);
