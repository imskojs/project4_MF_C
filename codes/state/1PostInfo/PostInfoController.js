(function() {
  'use strict';
  angular.module('app')
    .controller('PostInfoController', PostInfoController);

  PostInfoController.$inject = [
    '$scope',
    'PostInfoModel', 'Infos'
  ];

  function PostInfoController(
    $scope,
    PostInfoModel, Infos
  ) {
    var PostInfo = this;
    PostInfo.Model = PostInfoModel;

    PostInfo.Model.Infos = Infos;
    PostInfo.Model.Info = PostInfo.Model.Infos[0];
    PostInfo.InfoChanged = InfoChanged;

    //====================================================
    // Implementation
    //====================================================

    function InfoChanged(){
      $scope.$broadcast('PostInfo:InfoChanged');
    }
  }
})();
