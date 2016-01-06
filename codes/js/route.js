(function(angular) {
  'use strict';
  angular.module('app')
    .config(route);
  route.$inject = ['$stateProvider', '$httpProvider'];

  function route($stateProvider, $httpProvider) {

    $httpProvider.interceptors.push('AuthInterceptor');

    $stateProvider
      .state('Main', {
        url: '/Main',
        templateUrl: 'state/0Main/Main.html',
        controller: 'MainController as Main'
      })
      //====================================================
      //  Login
      //====================================================
      .state('Login', {
        url: '/Login',
        templateUrl: 'state/Login/Login.html',
        controller: 'LoginController as Login'
      })
      //====================================================
      //  FavoriteSetting
      //====================================================
      .state('FavoriteSetting', {
        url: '/FavoriteSetting',
        templateUrl: 'state/FavoriteSetting/FavoriteSetting.html',
        controller: 'FavoriteSettingController as FavoriteSetting'
      })
      //====================================================
      //  Home
      //====================================================
      .state('Main.Home', {
        url: '/Home',
        views: {
          Main: {
            templateUrl: 'state/Home/Home.html',
            controller: 'HomeController as Home'
          }
        }
      })
      //====================================================
      //  ProfileSetting
      //====================================================
      .state('Main.ProfileSetting', {
        url: '/ProfileSetting',
        views: {
          Main: {
            templateUrl: 'state/ProfileSetting/ProfileSetting.html',
            controller: 'ProfileSettingController as ProfileSetting'
          }
        }
      })
      //====================================================
      //  PlaceDetail
      //====================================================
      .state('Main.PlaceDetail', {
        url: '/PlaceDetail/:id',
        views: {
          Main: {
            templateUrl: 'state/PlaceDetail/PlaceDetail.html',
            controller: 'PlaceDetailController as PlaceDetail'
          }
        }
      })
      //====================================================
      //  PlaceContact
      //====================================================
      .state('Main.PlaceContact', {
        url: '/PlaceContact/:place',
        views: {
          Main: {
            templateUrl: 'state/PlaceContact/PlaceContact.html',
            controller: 'PlaceContactController as PlaceContact'
          }
        }
      })
      //====================================================
      //  BookingList
      //====================================================
      .state('Main.BookingList', {
        url: '/BookingList/:date',
        views: {
          Main: {
            templateUrl: 'state/BookingList/BookingList.html',
            controller: 'BookingListController as BookingList'
          }
        }
      })
      //====================================================
      //  BookingCancelList
      //====================================================
      .state('Main.BookingCancelList', {
        url: '/BookingCancelList',
        views: {
          Main: {
            templateUrl: 'state/BookingCancelList/BookingCancelList.html',
            controller: 'BookingCancelListController as BookingCancelList'
          }
        }
      })
      //====================================================
      //  PostFitList
      //====================================================
      .state('Main.PostFitList', {
        url: '/PostFitList',
        views: {
          Main: {
            templateUrl: 'state/PostFitList/PostFitList.html',
            controller: 'PostFitListController as PostFitList'
          }
        }
      })
      //====================================================
      //  PostFitWrite
      //====================================================
      .state('Main.PostFitWrite', {
        url: '/PostFitWrite',
        views: {
          Main: {
            templateUrl: 'state/PostFitWrite/PostFitWrite.html',
            controller: 'PostFitWriteController as PostFitWrite'
          }
        }
      })
      //====================================================
      //  PostFitDetail
      //====================================================
      .state('Main.PostFitDetail', {
        url: '/PostFitDetail/:id',
        views: {
          Main: {
            templateUrl: 'state/PostFitDetail/PostFitDetail.html',
            controller: 'PostFitDetailController as PostFitDetail'
          }
        }
      })
      //====================================================
      //  PostInfoList
      //====================================================
      .state('Main.PostInfoList', {
        url: '/PostInfoList',
        views: {
          Main: {
            templateUrl: 'state/PostInfoList/PostInfoList.html',
            controller: 'PostInfoListController as PostInfoList'
          }
        }
      })
      //====================================================
      //  PostInfoWrite
      //====================================================
      .state('Main.PostInfoWrite', {
        url: '/PostInfoWrite',
        views: {
          Main: {
            templateUrl: 'state/PostInfoWrite/PostInfoWrite.html',
            controller: 'PostInfoWriteController as PostInfoWrite'
          }
        }
      })
      //====================================================
      //  PostInfoDetail
      //====================================================
      .state('Main.PostInfoDetail', {
        url: '/PostInfoDetail/:id',
        views: {
          Main: {
            templateUrl: 'state/PostInfoDetail/PostInfoDetail.html',
            controller: 'PostInfoDetailController as PostInfoDetail'
          }
        }
      })
      //====================================================
      //  PostQuestionList
      //====================================================
      .state('Main.PostQuestionList', {
        url: '/PostQuestionList',
        views: {
          Main: {
            templateUrl: 'state/PostQuestionList/PostQuestionList.html',
            controller: 'PostQuestionListController as PostQuestionList'
          }
        }
      })
      //====================================================
      //  PostQuestionWrite
      //====================================================
      .state('Main.PostQuestionWrite', {
        url: '/PostQuestionWrite',
        views: {
          Main: {
            templateUrl: 'state/PostQuestionWrite/PostQuestionWrite.html',
            controller: 'PostQuestionWriteController as PostQuestionWrite'
          }
        }
      })
      //====================================================
      //  PostQuestionDetail
      //====================================================
      .state('Main.PostQuestionDetail', {
        url: '/PostQuestionDetail/:id',
        views: {
          Main: {
            templateUrl: 'state/PostQuestionDetail/PostQuestionDetail.html',
            controller: 'PostQuestionDetailController as PostQuestionDetail'
          }
        }
      })
      //====================================================
      //  PostEventList
      //====================================================
      .state('PostEvent', {
        url: '/PostEvent',
        templateUrl: 'state/0PostEvent/PostEvent.html',
        controller: 'PostEventController as PostEvent'
      })
      //====================================================
      //  EventFitMateList
      //====================================================
      .state('PostEvent.EventFitMateList', {
        url: '/EventFitMateList',
        views: {
          PostEvent: {
            templateUrl: 'state/EventFitMateList/EventFitMateList.html',
            controller: 'EventFitMateListController as EventFitMateList'
          }
        }
      })
      //====================================================
      //  EventFitMateDetail
      //====================================================
      .state('Main.EventFitMateDetail', {
        url: '/EventFitMateDetail/:id',
        views: {
          Main: {
            templateUrl: 'state/EventFitMateDetail/EventFitMateDetail.html',
            controller: 'EventFitMateDetailController as EventFitMateDetail'
          }
        }
      })
      //====================================================
      //  EventCompanyList
      //====================================================
      .state('PostEvent.EventCompanyList', {
        url: '/EventCompanyList',
        views: {
          PostEvent: {
            templateUrl: 'state/EventCompanyList/EventCompanyList.html',
            controller: 'EventCompanyListController as EventCompanyList'
          }
        }
      })
      //====================================================
      //  EventCompanyWrite
      //====================================================
      .state('PostEvent.EventCompanyWrite', {
        url: '/EventCompanyWrite',
        views: {
          PostEvent: {
            templateUrl: 'state/EventCompanyWrite/EventCompanyWrite.html',
            controller: 'EventCompanyWriteController as EventCompanyWrite'
          }
        }
      })
      //====================================================
      //  EventCompanyDetail
      //====================================================
      .state('PostEvent.EventCompanyDetail', {
        url: '/EventCompanyDetail/:id',
        views: {
          PostEvent: {
            templateUrl: 'state/EventCompanyDetail/EventCompanyDetail.html',
            controller: 'EventCompanyDetailController as EventCompanyDetail'
          }
        }
      })
      //====================================================
      //  CouponDetail
      //====================================================
      .state('Main.CouponDetail', {
        url: '/CouponDetail/:id',
        views: {
          Main: {
            templateUrl: 'state/CouponDetail/CouponDetail.html',
            controller: 'CouponDetailController as CouponDetail'
          }
        }
      })
      //====================================================
      //  DaumMap: alias WhereToGo
      //====================================================
      .state('Main.DaumMap', {
        url: '/DaumMap',
        views: {
          Main: {
            templateUrl: 'state/DaumMap/DaumMap.html',
            controller: 'DaumMapController as DaumMap'
          }
        }
      })



















    .state('Main.SampleList', {
        params: {
          category: ''
        },
        url: '/SampleList',
        views: {
          Main: {
            templateUrl: 'state/SampleList/SampleList.html',
            controller: 'SampleListController as SampleList'
          }
        }
      })
      .state('Main.SampleDetail', {
        params: {
          id: ''
        },
        url: '/SampleDetail',
        views: {
          Main: {
            templateUrl: 'state/SampleDetail/SampleDetail.html',
            controller: 'SampleDetailController as SampleDetail'
          }
        }
      });

  } //route end
})(angular);
