(function() {
  'use strict';
  angular.module('app')
    .controller('PostInfoWriteController', PostInfoWriteController);

  PostInfoWriteController.$inject = [
    'Infos', 'PostInfoWriteModel'
  ];

  function PostInfoWriteController(
    Infos, PostInfoWriteModel
  ) {
    var PostInfoWrite = this;
    PostInfoWrite.Model = PostInfoWriteModel;

    PostInfoWrite.Infos = Infos;
    PostInfoWrite.Info = PostInfoWrite.Infos[0];

    //====================================================
    //  Implementation
    //====================================================

  }
})();
