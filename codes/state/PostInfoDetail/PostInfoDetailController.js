(function() {
  'use strict';
  angular.module('app')
    .controller('PostInfoDetailController', PostInfoDetailController);

  PostInfoDetailController.$inject = [
    'PostInfoDetailModel'
  ];

  function PostInfoDetailController(
    PostInfoDetailModel
  ) {
    var PostInfoDetail = this;
    PostInfoDetail.Model = PostInfoDetailModel;

    //====================================================
    //  Implementation
    //====================================================

  }
})();
