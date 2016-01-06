(function() {
  'use strict';
  angular.module('app')
    .controller('PostFitDetailController', PostFitDetailController);

  PostFitDetailController.$inject = [
    'PostFitDetailModel'
  ];

  function PostFitDetailController(
    PostFitDetailModel
  ) {
    var PostFitDetail = this;
    PostFitDetail.Model = PostFitDetailModel;

    //====================================================
    //  Implementation
    //====================================================

  }
})();
