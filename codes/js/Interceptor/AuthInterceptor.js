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
(function(angular) {
  'use strict';
  angular.module('app')
    .factory('AuthInterceptor', AuthInterceptor);

  AuthInterceptor.$inject = ['AppStorage', 'DEV_MODE'];

  function AuthInterceptor(AppStorage, DEV_MODE) {

    var interceptor = {
      request: request
    };

    return interceptor;

    function request(req) {
      var token;
      if (DEV_MODE) {
        token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwYXNzcG9ydHMiOltdLCJyb2xlcyI6W3sibmFtZSI6IkFETUlOIiwiYWN0aXZlIjp0cnVlLCJjcmVhdGVkQXQiOiIyMDE1LTEyLTIzVDA3OjA4OjMyLjU0OFoiLCJ1cGRhdGVkQXQiOiIyMDE1LTEyLTIzVDA3OjA4OjMyLjU0OFoiLCJpZCI6IjU2N2E0ODcwNDk3N2FjNWI0NjcyY2JhNCJ9XSwicGVybWlzc2lvbnMiOltdLCJ1c2VkUm95YWx0eVBvaW50cyI6W10sImJvb2tpbmdzIjpbXSwicm95YWx0eVBvaW50cyI6W10sInBob3RvcyI6W10sImRldmljZXMiOltdLCJlbWFpbCI6ImFkbWluQGFwcGxpY2F0LmNvLmtyIiwidXNlcm5hbWUiOiJhZG1pbiIsIm5pY2tuYW1lIjoi6rSA66as7J6QIiwiY3JlYXRlZEF0IjoiMjAxNS0xMi0yM1QwNzowOTozOC4xMDJaIiwidXBkYXRlZEF0IjoiMjAxNS0xMi0yM1QwNzowOTozOC4xMzlaIiwib3duZXIiOiI1NjdhNDhiMjVjN2Q3OTcyNDZiZDA2YzUiLCJpZCI6IjU2N2E0OGIyNWM3ZDc5NzI0NmJkMDZjNSIsImlhdCI6MTQ1MjE2NDI3NSwiZXhwIjoxNDgzNzAwMjc1fQ.gxNZL5QJQiLYkattLHf5na1M1H7FfzvYhXn543wS7-k';
      } else {
        token = AppStorage.token;
      }
      if (token) {
        req.headers.Authorization = 'Bearer ' + token;
      }
      return req;
    }

  }
})(angular);
