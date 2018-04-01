'use strict';

describe('Component: UsermemesComponent', function() {
  // load the controller's module
  beforeEach(module('myPintrestCloneAppApp.usermemes'));

  var UsermemesComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    UsermemesComponent = $componentController('usermemes', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
