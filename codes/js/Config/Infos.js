(function(angular) {
  'use strict';

  angular.module('app')
    .value('Infos', [
      { name: '헬스/트레이닝' },
      { name: '에어로빅' },
      { name: '필라테스' },
      { name: '요가' },
      { name: '복싱' },
      { name: '클라이밍' }
    ]);

})(angular);
