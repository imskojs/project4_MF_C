(function() {
  'use strict';
  angular.module('app')
    .controller('PostFitWriteController', PostFitWriteController);

  PostFitWriteController.$inject = [
    'Locations', 'PostFitWriteModel'
  ];

  function PostFitWriteController(
    Locations, PostFitWriteModel
  ) {
    var PostFitWrite = this;
    PostFitWrite.Model = PostFitWriteModel;

    PostFitWrite.Locations = Locations;
    PostFitWrite.Location = PostFitWrite.Locations[0];

    //====================================================
    //  Implementation
    //====================================================

  }
})();
