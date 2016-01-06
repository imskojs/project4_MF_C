(function(angular) {
  'use strict';

  angular.module('app')
    .factory('MainModel', MainModel);

  MainModel.$inject = [];

  function MainModel() {

    var model = {
      categories: [
        'HEALTH',
        'AEROBIC',
        'PILATES',
        'YOGA',
        'BOXING',
        'CLIMBING'
      ],
      selectedCategory: 'BOXING'
    };

    return model;
  }
})(angular);
