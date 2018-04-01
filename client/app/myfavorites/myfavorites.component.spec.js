'use strict';

describe('Component: MyfavoritesComponent', function() {
  // load the controller's module
  beforeEach(module('myPintrestCloneAppApp.myfavorites'));

  var MyfavoritesComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    MyfavoritesComponent = $componentController('myfavorites', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
