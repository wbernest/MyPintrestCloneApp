'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('myfavorites', {
      url: '/myfavorites',
      template: '<myfavorites></myfavorites>',
      authenticate:true
    });
}
