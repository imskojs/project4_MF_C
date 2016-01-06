(function() {
  'use strict';

  angular.module('app')
    .factory('PostQuestionDetailModel', PostQuestionDetailModel);

  PostQuestionDetailModel.$inject = [];

  function PostQuestionDetailModel() {

    var Model = {
      loading: false,
      post: {
        title: '강남구 역삼동 같이 요가 하실 여성 분 찾아요~',
        content: '강남구 역삼동에 사는 이연희라고 합니다. 역삼동 파워 휘트니스에서 직장인 반 요가 클래스가 있는데, 수업이 끝나면 시간이 늦어 혼자 다니기가 고민되서요 ㅠ 같은 지역 사시는 여성 분들 중 같이 요가 배워보실분 찾습니다~ ',
        createdBy: {
          name: 'Lee Yeon Hee'
        },
        createdAt: new Date(),
        views: 444,
        commentsCount: 44
      },
      comments: [{
        createdBy: {
          name: 'Lee Yeon Hee'
        },
        content: '강남구 역삼동 역삼 공원쪽에 사는 임경화에요! 저도 그 클래스 보고 고민 고민 하던 중이었는데!! 같이 하실래요~? ',
        createdAt: new Date()
      }]
    };

    return Model;
  }
})();
