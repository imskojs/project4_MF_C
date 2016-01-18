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
        url: '/PlaceDetail/:name/:id',
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
        url: '/PlaceContact/:name/:place',
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
      //  PostFit
      //====================================================
      .state('Main.PostFit', {
        url: '/PostFit',
        views: {
          Main: {
            templateUrl: 'state/1PostFit/PostFit.html',
            controller: 'PostFitController as PostFit'
          }
        }
      })
      //====================================================
      //  PostFitList
      //====================================================
      .state('Main.PostFit.PostFitList', {
        url: '/PostFitList',
        views: {
          PostFit: {
            templateUrl: 'state/PostFitList/PostFitList.html',
            controller: 'PostFitListController as PostFitList'
          }
        }
      })
      //====================================================
      //  PostFitWrite
      //====================================================
      .state('Main.PostFit.PostFitWrite', {
        url: '/PostFitWrite/:category',
        views: {
          PostFit: {
            templateUrl: 'state/PostFitWrite/PostFitWrite.html',
            controller: 'PostFitWriteController as PostFitWrite'
          }
        }
      })
      //====================================================
      //  PostFitUpdate
      //====================================================
      .state('Main.PostFit.PostFitUpdate', {
        url: '/PostFitUpdate/:id',
        views: {
          PostFit: {
            templateUrl: 'state/PostFitUpdate/PostFitUpdate.html',
            controller: 'PostFitUpdateController as PostFitUpdate'
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
      //  PostInfo
      //====================================================
      .state('Main.PostInfo', {
        url: '/PostInfo',
        views: {
          Main: {
            templateUrl: 'state/1PostInfo/PostInfo.html',
            controller: 'PostInfoController as PostInfo'
          }
        }
      })
      //====================================================
      //  PostInfoList
      //====================================================
      .state('Main.PostInfo.PostInfoList', {
        url: '/PostInfoList',
        views: {
          PostInfo: {
            templateUrl: 'state/PostInfoList/PostInfoList.html',
            controller: 'PostInfoListController as PostInfoList'
          }
        }
      })
      //====================================================
      //  PostInfoWrite
      //====================================================
      .state('Main.PostInfo.PostInfoWrite', {
        url: '/PostInfoWrite',
        views: {
          PostInfo: {
            templateUrl: 'state/PostInfoWrite/PostInfoWrite.html',
            controller: 'PostInfoWriteController as PostInfoWrite'
          }
        }
      })
      //====================================================
      //  PostInfoUpdate
      //====================================================
      .state('Main.PostInfo.PostInfoUpdate', {
        url: '/PostInfoUpdate/:id',
        views: {
          PostInfo: {
            templateUrl: 'state/PostInfoUpdate/PostInfoUpdate.html',
            controller: 'PostInfoUpdateController as PostInfoUpdate'
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
      //  PostQuestion
      //====================================================
      .state('Main.PostQuestion', {
        url: '/PostQuestion',
        views: {
          Main: {
            templateUrl: 'state/1PostQuestion/PostQuestion.html',
            controller: 'PostQuestionController as PostQuestion'
          }
        }
      })
      //====================================================
      //  PostQuestionList
      //====================================================
      .state('Main.PostQuestion.PostQuestionList', {
        url: '/PostQuestionList',
        views: {
          PostQuestion: {
            templateUrl: 'state/PostQuestionList/PostQuestionList.html',
            controller: 'PostQuestionListController as PostQuestionList'
          }
        }
      })
      //====================================================
      //  PostQuestionWrite
      //====================================================
      .state('Main.PostQuestion.PostQuestionWrite', {
        url: '/PostQuestionWrite',
        views: {
          PostQuestion: {
            templateUrl: 'state/PostQuestionWrite/PostQuestionWrite.html',
            controller: 'PostQuestionWriteController as PostQuestionWrite'
          }
        }
      })
      //====================================================
      //  PostQuestionUpdate
      //====================================================
      .state('Main.PostQuestion.PostQuestionUpdate', {
        url: '/PostQuestionUpdate/:id',
        views: {
          PostQuestion: {
            templateUrl: 'state/PostQuestionUpdate/PostQuestionUpdate.html',
            controller: 'PostQuestionUpdateController as PostQuestionUpdate'
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
      .state('Main.PostEvent', {
        url: '/PostEvent',
        views: {
          Main: {
            templateUrl: 'state/1PostEvent/PostEvent.html',
            controller: 'PostEventController as PostEvent'
          }
        }
      })
      //====================================================
      //  EventFitMateList
      //====================================================
      .state('Main.PostEvent.EventFitMateList', {
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
      .state('Main.PostEvent.EventCompanyList', {
        url: '/EventCompanyList',
        views: {
          PostEvent: {
            templateUrl: 'state/EventCompanyList/EventCompanyList.html',
            controller: 'EventCompanyListController as EventCompanyList'
          }
        }
      })
      //====================================================
      //  EventCompanyContact
      //====================================================
      .state('Main.EventCompanyContact', {
        url: '/EventCompanyContact',
        views: {
          Main: {
            templateUrl: 'state/EventCompanyContact/EventCompanyContact.html',
            controller: 'EventCompanyContactController as EventCompanyContact'
          }
        }
      })
      //====================================================
      //  EventCompanyDetail
      //====================================================
      .state('Main.EventCompanyDetail', {
        url: '/EventCompanyDetail/:id',
        views: {
          Main: {
            templateUrl: 'state/EventCompanyDetail/EventCompanyDetail.html',
            controller: 'EventCompanyDetailController as EventCompanyDetail'
          }
        }
      })
      //====================================================
      //  CouponDetail
      //====================================================
      .state('Main.CouponDetail', {
        url: '/CouponDetail/:placeName/:id',
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
