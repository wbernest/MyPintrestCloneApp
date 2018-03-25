'use strict';
const angular = require('angular');

export default angular.module('myPintrestCloneAppApp.banner', [])
  .directive('banner', function() {
    return {
      template: require('./banner.html'),
      restrict: 'EA',
      link: function(scope, element, attrs) {
        scope.text = attrs.text;
      }
    };
  })
  .name;
