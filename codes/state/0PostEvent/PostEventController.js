(function() {
  'use strict';
  angular.module('app')
    .controller('PostEventController', PostEventController);

  PostEventController.$inject = [
    'PostEventModel'
  ];

  function PostEventController(
    PostEventModel
  ) {
    var PostEvent = this;
    PostEvent.Model = PostEventModel;

  }
})();
