(function() {
  'use strict';

  angular.module('app')
    .directive('daumMap', daumMap);

  // Place or Posts
  daumMap.$inject = [
    '$state', '$cordovaGeolocation', '$q', '$stateParams', '$window', '$filter',
    'DaumMapModel', 'Message', 'Place', 'U', 'AppStorage'
  ];

  function daumMap(
    $state, $cordovaGeolocation, $q, $stateParams, $window, $filter,
    DaumMapModel, Message, Place, U, AppStorage
  ) {

    var daum = $window.daum;

    return {
      scope: {
        markerSrc: '@',
        markerClickedSrc: '@',
        markerWidth: '@',
        markerHeight: '@',
      },
      compile: function(element) {
        //==========================================================================
        //              Global Map Property
        //==========================================================================
        var DOM = element[0];
        var latitude;
        var longitude;
        if (DaumMapModel.lastCenter && DaumMapModel.lastCenter.longitude) {
          latitude = DaumMapModel.lastCenter.latitude;
          longitude = DaumMapModel.lastCenter.longitude;
        } else {
          latitude = 37.5;
          longitude = 127;
        }
        var mapOptions = {
          center: new daum.maps.LatLng(latitude, longitude),
          level: 4,
          draggable: true
        };
        daum.maps.disableHD();
        var map = new daum.maps.Map(DOM, mapOptions);
        var ps = new daum.maps.services.Places();
        map.setCopyrightPosition(daum.maps.CopyrightPosition.BOTTOMRIGHT /*BOTTOMLEFT*/ , false);
        // var geocoder = new daum.maps.services.Geocoder();

        //====================================================
        //  IMPLEMENTATIONS COMPILE
        //====================================================
        // Draw Markers after query
        var drawMarkers = function(currentCenter, markerImg, markerClickedImg, scope) {
          resetMarkers();
          requestPlacesWithin(currentCenter)
            .then(processPin.bind(null, markerImg, markerClickedImg, scope))
            .catch(function error(err) {
              Message.hide();
              // Message.alert();
              console.log("---------- err: requestPlaceWithin: DaumMap ----------");
              console.log(err);
            });
        };
        //====================================================
        //  HELPER
        //====================================================
        function resetMarkers() {
          angular.forEach(DaumMapModel.markers, function(marker) {
            marker.setMap(null);
          });
          DaumMapModel.markers = [];
        }

        function requestPlacesWithin(currentCenter) {
          // Request server for places;
          DaumMapModel.selectedPlace = {};
          var PlacesPromise = {};
          var query = {};
          if ($stateParams.id) { // if from place detail
            PlacesPromise = Place.findOne({
              query: {
                where: {
                  id: $stateParams.id
                },
                populates: ['photos']
              }
            }).$promise;
          } else {
            query = {
              query: {
                geoJSON: {
                  $near: {
                    $geometry: {
                      type: 'Point',
                      coordinates: [currentCenter.longitude, currentCenter.latitude, ]
                    },
                    $maxDistance: currentCenter.distance || 5000
                  }
                },
                category: $filter('AppText')(AppStorage.selectedCategory),
                limit: currentCenter.limit || 50,
                populates: ['photos']
              }
            };
            PlacesPromise = Place.findNative(query).$promise;
          }
          return PlacesPromise;
        }

        function processPin(markerImg, markerClickedImg, scope, placesWrapper) {
          if ($stateParams.id) {
            DaumMapModel.places = [placesWrapper];
          } else {
            DaumMapModel.places = placesWrapper.places;
          }
          console.log("---------- DaumMapModel.places ----------");
          console.log(DaumMapModel.places);
          angular.forEach(DaumMapModel.places, function(place, i) {
            //place = {location:{type:'Point', coordinates:[126.10101, 27.101010]}, ...}
            var placeLongitude = place.geoJSON.coordinates[0];
            var placeLatitude = place.geoJSON.coordinates[1];
            // set marker
            var position = new daum.maps.LatLng(placeLatitude, placeLongitude);
            var marker = new daum.maps.Marker({
              map: map,
              position: position,
              // used as to link to place info
              title: String(i),
              image: markerImg,
              clickable: true
            });
            daum.maps.event.addListener(marker, 'click', function() {
              var marker = this;
              scope.$apply(function() {
                // on click: differentiate clicked image;
                angular.forEach(DaumMapModel.markers, function(otherMarker) {
                  otherMarker.setImage(markerImg);
                });
                marker.setImage(markerClickedImg);
                // on click: show modal which will be filled with place info
                // modal references DaumMapModel.selectedPlace to fill in the info
                var index = Number(marker.getTitle());
                Message.loading();
                Place.findOne({
                    query: {
                      id: DaumMapModel.places[index].id,
                      populates: ['photos', 'createdBy']
                    }
                  }).$promise
                  .then(function(data) {
                    DaumMapModel.selectedPlace = data;
                    console.log("---------- DaumMapModel.selectedPlace ----------");
                    console.log(DaumMapModel.selectedPlace);
                    Message.hide();
                    DaumMapModel.modal.show();
                  })
                  .catch(function(err) {
                    console.log("---------- err ----------");
                    console.log(err);
                    Message.alert();
                  });
                DaumMapModel.selectedPlace = DaumMapModel.places[index];
              });
            });
            // Save converted place with click event added.
            DaumMapModel.markers.push(marker);
          });
          Message.hide();
        }

        //====================================================
        //  Functions Exposed to controller via DaumMapModel
        //====================================================
        DaumMapModel.findMeThenSearchNearBy = function(justFindAndDontSearch) {
          DaumMapModel.selectedPlace = {};
          Message.loading();
          $cordovaGeolocation.getCurrentPosition({
              maximumAge: 3000,
              timeout: 6000
            })
            .then(function(position) {
              Message.hide();
              if (position.coords == null) {
                Message.alert(
                  '위치 공유가 꺼져있습니다.',
                  '위치 공유를 켜주세요.'
                );
                return false;
              }
              DaumMapModel.currentPosition = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
              };
              if (!justFindAndDontSearch) {
                map.setCenter(new daum.maps.LatLng(
                  DaumMapModel.currentPosition.latitude,
                  DaumMapModel.currentPosition.longitude
                ));
              }
              // drawMarkers(currentCenter);
            })
            .catch(function() {
              Message.hide();
              Message.alert(
                '위치 공유가 꺼져있습니다.',
                '위치 공유를 켜주세요.'
              );
            });
        };


        DaumMapModel.findPlaceByIdThenDrawAPlace = function(id) {
          DaumMapModel.selectedPlace = {};
          Message.loading();
          Place.findOne({
              query: {
                id: id,
                populates: ['photos']
              }
            }).$promise
            .then(function success(place) {
              //-------------------------------------------------------
              //  Hacky fix: when coming back to map if the map's center is the same as the
              // place we want to pane to, search does not get called. So make it wiggle a bit.
              //-------------------------------------------------------
              var currentCenter = {
                longitude: map.getCenter().getLng(),
                latitude: map.getCenter().getLat()
              };
              if (Math.abs(currentCenter.longitude - place.geoJSON.coordinates[1]) < 0.00001 && Math.abs(currentCenter.latitude - place.geoJSON.coordinates[0]) < 0.00001) {
                map.panTo(new daum.maps.LatLng(
                  currentCenter.longitude + 0.011,
                  currentCenter.latitude + 0.011
                ));
              }
              //------------------------
              //  Hacky fix ends;
              //------------------------
              map.panTo(new daum.maps.LatLng(
                place.geoJSON.coordinates[1],
                place.geoJSON.coordinates[0]
              ));
              Message.hide();
            })
            .catch(function error(err) {
              Message.hide();
              console.log(err);
            });
        };

        DaumMapModel.searchLocationNearBy = function(value) {
          DaumMapModel.selectedPlace = {};
          Message.loading();
          if (!value) {
            Message.hide();
            Message.alert('검색하기 알림', '장소 값을 넣어서 다시 검색해주세요');
            return false;
          }
          ps.keywordSearch(value, function(status, data) {
            if (data.places[0] === undefined) {
              Message.hide();
              Message.alert(
                '요청하신 장소가 없습니다',
                '다시검색해주세요'
              );
              return false;
            }
            // move to center of searched result.
            map.panTo(new daum.maps.LatLng(
              data.places[0].latitude,
              data.places[0].longitude
            ));
            // map's center is moved it will drawMarkers().
            Message.hide();
          }, function(err) {
            console.log(err);
            Message.hide();
            Message.alert({
              title: '위치 공유가 꺼져있습니다.',
              template: '위치 공유 켜주세요.'
            });
          });
        };

        return function link(scope) {
          // Marker style properties.
          var markerSize = new daum.maps.Size(Number(scope.markerWidth), Number(scope.markerHeight));
          var markerImg = new daum.maps.MarkerImage(scope.markerSrc, markerSize);
          var markerClickedImg = new daum.maps.MarkerImage(scope.markerClickedSrc, markerSize);
          map.relayout();
          DaumMapModel.domMap = map;
          // ------------------------
          //  Search when moved
          // ------------------------
          daum.maps.event.addListener(map, 'idle', function() {
            map.relayout();
            if ($window.cordova && !$window.cordova.plugins.Keyboard.isVisible) {
              Message.loading();
            }
            var currentCenter = {
              longitude: map.getCenter().getLng(),
              latitude: map.getCenter().getLat()
            };
            DaumMapModel.lastCenter = currentCenter;
            angular.extend(currentCenter, {
              distance: 5000,
              limit: 20
            });
            drawMarkers(currentCenter, markerImg, markerClickedImg, scope);
          });
        };
      }
    };
  }

})();
