'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('mymemes', {
      url: '/mymemes',
      template: '<mymemes></mymemes>',
      authenticate: true
    });
}
