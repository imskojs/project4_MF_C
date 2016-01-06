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

// Description: Extends $rootScope with custom functions;

// Usage;
// In app.js
// .run(['$rootScope', 'RootScope', function ($rootScope, RootScope){
//   angular.extend($rootScope, RootScope);
// }])
(function(angular) {
  'use strict';

  angular.module('app')
    .factory('RootScope', RootScope);

  RootScope.$inject = [
    '$state', '$stateParams', '$ionicHistory', '$ionicSideMenuDelegate', '$timeout',
    '$rootScope', '$ionicViewSwitcher',
    'DEV_MODE', 'Message', 'AppStorage'
  ];

  function RootScope(
    $state, $stateParams, $ionicHistory, $ionicSideMenuDelegate, $timeout,
    $rootScope, $ionicViewSwitcher,
    DEV_MODE, Message, AppStorage
  ) {
    var service = {
      AppStorage: AppStorage,
      $state: $state,
      $stateParams: $stateParams,
      isState: isState,
      areStates: areStates,
      getState: getState,
      isParam: isParam,
      hasParam: hasParam,
      getParam: getParam,
      goToState: goToState,
      goBack: goBack,
      loading: loading,
      toggleSideMenu: toggleSideMenu,
      closeSideMenu: closeSideMenu,
      comingSoon: comingSoon,
      DEV_MODE: DEV_MODE
    };

    return service;

    function isState(state) {
      return state === $ionicHistory.currentStateName();
    }

    function areStates(states) {
      return states.indexOf($ionicHistory.currentStateName()) !== -1;
    }

    function getState() {
      return $ionicHistory.currentStateName();
    }
    //====================================================
    //  $rootScope.isParam({id: '123', category: ''}) >> true | false
    //====================================================
    function isParam(paramObj) {
      for (var key in paramObj) {
        if ($state.params[key] !== paramObj[key]) {
          return false;
        }
      }
      return true;
    }

    function hasParam(paramKey) {

      if ($state.params[paramKey] !== '') {
        return true;
      } else {
        return false;
      }
    }
    //====================================================
    // $rootScope.getParam(category)  >> $stateParams[category]
    //====================================================
    function getParam(key) {
      return $state.params[key];
    }
    //====================================================
    //  $rootScope.goToState('Main.Home', {category: 'apple', theme: 'drink'})
    //====================================================
    function goToState(state, params, direction) {
      Message.hide();
      $timeout(function() {
        if (direction) {
          $ionicViewSwitcher.nextDirection(direction);
        }
        $state.go(state, params);
        $ionicSideMenuDelegate.toggleLeft(false);
      }, 0);
    }
    //====================================================
    //  $rootScope.goBack();
    //====================================================
    function goBack(direction) {
      if (direction) {
        $ionicViewSwitcher.nextDirection(direction);
      }
      $ionicHistory.goBack();
    }
    //====================================================
    //  $rootScope.loading();
    //====================================================
    function loading() {
      Message.loading();
      $timeout(function() {
        Message.hide();
      }, 5000);
    }
    //====================================================
    //  $rootScope.closeSideMenu();
    //====================================================
    function closeSideMenu() {
      $ionicSideMenuDelegate.toggleLeft(false);
    }
    //====================================================
    //  $rootScope.toggleSideMenu();
    //====================================================
    function toggleSideMenu(requireLoggedIn) {
      if (requireLoggedIn) {
        if (!AppStorage.token) {
          return Message.alert('둘러보기 알림', '로그인을 하셔야 볼수있는 내용입니다.');
        }
      }
      $ionicSideMenuDelegate.toggleLeft();
    }
    //====================================================
    //  $rootScope.comingSoon();
    //====================================================
    function comingSoon(title) {
      return Message.alert(title + ' 준비중인 서비스입니다.', '빠른시일내에 준비완료하겠습니다.');
    }


  } //end
})(angular);
