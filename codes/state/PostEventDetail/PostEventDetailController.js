(function() {
  'use strict';
  angular.module('app')
    .controller('PostEventDetailController', PostEventDetailController);

  PostEventDetailController.$inject = [
    'PostEventDetailModel'
  ];

  function PostEventDetailController(
    PostEventDetailModel
  ) {
    var PostEventDetail = this;
    PostEventDetail.Model = PostEventDetailModel;

    //====================================================
    //  Implementation
    //====================================================

  }
})();
