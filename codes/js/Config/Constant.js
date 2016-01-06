(function(angular) {
  'use strict';

  angular.module('app')
    .constant("SERVER_URL", "http://192.168.0.65:1337")
    .constant("GOOGLE_PUSH_SENDER_ID", "000000000000")
    .constant("KAKAO_KEY", "abcdefghijklmnopqrstu0123456789")
    .constant("FACEBOOK_KEY", "000000000000000")
    .constant("DEV_MODE", true)
    .constant("APP_NAME", "YOUR_APP_NAME")
    .constant("APP_ID", 0);
})(angular);
