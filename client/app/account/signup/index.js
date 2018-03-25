'use strict';

import angular from 'angular';
import SignupController from './signup.controller';

export default angular.module('myPintrestCloneAppApp.signup', [])
  .controller('SignupController', SignupController)
  .name;
