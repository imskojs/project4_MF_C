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
// Dependencies
//Cordova InAppBrowser
//Cordova SocialSharing
(function(angular) {
  'use strict';

  angular.module('app')
    .factory('Link', Link);

  Link.$inject = [
    '$window', '$cordovaSocialSharing', '$state',
    'AppStorage', 'Message'
  ];

  function Link(
    $window, $cordovaSocialSharing, $state,
    AppStorage, Message
  ) {

    var service = {
      call: call,
      open: open,
      share: share
    };
    return service;

    //====================================================
    //  Link.call Usage
    //====================================================
    //Link.call(01011010101)
    // Output
    //phone call
    function call(number) {
      console.log(number);
      $window.location.href = 'tel:' + number;
    }

    //====================================================
    //  Link.openLink Usage
    //====================================================
    //Link.openLink('http://www.applicat.co.kr');
    // Output
    //InAppBrowser open new window with url
    function open(link) {
      return $window.open(link, '_system');
    }

    //====================================================
    //  Link.share Usage
    //====================================================
    // Link.share('my title', 'my content stuff', 'http://www.applicat.co.kr')
    // Output
    //Social Share title content and link
    function share(title, content, url) {
      return $cordovaSocialSharing
        .share(title, content, null, url)
        .then(function(suc) {
          console.log(suc);
        }, function(err) {
          console.log(err);
        });
    }
  }
})(angular);
