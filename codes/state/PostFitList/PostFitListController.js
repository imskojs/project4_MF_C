(function() {
  'use strict';
  angular.module('app')
    .controller('PostFitDetailController', PostFitDetailController);

  PostFitDetailController.$inject = [
    'Locations', 'PostFitDetailModel'
  ];

  function PostFitDetailController(
    Locations, PostFitDetailModel
  ) {
    var PostFitDetail = this;
    PostFitDetail.Model = PostFitDetailModel;

    //====================================================
    //  Implementation
    //====================================================

  }
})();
