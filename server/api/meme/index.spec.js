'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var memeCtrlStub = {
  index: 'memeCtrl.index',
  show: 'memeCtrl.show',
  create: 'memeCtrl.create',
  upsert: 'memeCtrl.upsert',
  patch: 'memeCtrl.patch',
  destroy: 'memeCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var memeIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './meme.controller': memeCtrlStub
});

describe('Meme API Router:', function() {
  it('should return an express router instance', function() {
    expect(memeIndex).to.equal(routerStub);
  });

  describe('GET /api/memes', function() {
    it('should route to meme.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'memeCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/memes/:id', function() {
    it('should route to meme.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'memeCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/memes', function() {
    it('should route to meme.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'memeCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/memes/:id', function() {
    it('should route to meme.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'memeCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/memes/:id', function() {
    it('should route to meme.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'memeCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/memes/:id', function() {
    it('should route to meme.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'memeCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
