'use strict';

describe('Component: MymemesComponent', function() {
  // load the controller's module
  beforeEach(module('myPintrestCloneAppApp.mymemes'));

  var MymemesComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    MymemesComponent = $componentController('mymemes', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
