(function() {
  'use strict';

  angular.module('app')
    .factory('PostFitListModel', PostFitListModel);

  PostFitListModel.$inject = [

  ];

  function PostFitListModel(

  ) {

    var Model = {
      loading: false,
      posts: []
    };

    return Model;
  }
})();
