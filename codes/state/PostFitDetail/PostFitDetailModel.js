(function() {
  'use strict';

  angular.module('app')
    .factory('PostFitDetailModel', PostFitDetailModel);

  PostFitDetailModel.$inject = [

  ];

  function PostFitDetailModel(

  ) {

    var Model = {
      loading: false,
      post: {},
      comments: []
    };

    return Model;
  }
})();
