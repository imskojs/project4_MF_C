(function() {
  'use strict';
  angular.module('app')
    .controller('HomeController', HomeController);

  HomeController.$inject = [
    '$cordovaSocialSharing',
    'HomeModel'
  ];

  function HomeController(
    $cordovaSocialSharing,
    HomeModel
  ) {
    var Home = this;
    Home.Model = HomeModel;

    Home.share = share;

    //====================================================
    //  Implementation
    //====================================================
    function share() {
      $cordovaSocialSharing.share('test', 'sub', null, 'http://www.mylink.com')
        .then(function(result) {
          console.log(JSON.stringify(result));
        }, function(err) {
          console.log(JSON.stringify(err));
        });
    }
  }
})();
