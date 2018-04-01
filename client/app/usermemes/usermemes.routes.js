'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('usermemes', {
      url: '/usermemes/:id',
      template: '<usermemes></usermemes>',
      authentication: true
    });
}
