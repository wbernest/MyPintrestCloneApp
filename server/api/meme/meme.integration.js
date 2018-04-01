'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

var newMeme;

describe('Meme API:', function() {
  describe('GET /api/memes', function() {
    var memes;

    beforeEach(function(done) {
      request(app)
        .get('/api/memes')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          memes = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(memes).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/memes', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/memes')
        .send({
          name: 'New Meme',
          info: 'This is the brand new meme!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newMeme = res.body;
          done();
        });
    });

    it('should respond with the newly created meme', function() {
      expect(newMeme.name).to.equal('New Meme');
      expect(newMeme.info).to.equal('This is the brand new meme!!!');
    });
  });

  describe('GET /api/memes/:id', function() {
    var meme;

    beforeEach(function(done) {
      request(app)
        .get(`/api/memes/${newMeme._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          meme = res.body;
          done();
        });
    });

    afterEach(function() {
      meme = {};
    });

    it('should respond with the requested meme', function() {
      expect(meme.name).to.equal('New Meme');
      expect(meme.info).to.equal('This is the brand new meme!!!');
    });
  });

  describe('PUT /api/memes/:id', function() {
    var updatedMeme;

    beforeEach(function(done) {
      request(app)
        .put(`/api/memes/${newMeme._id}`)
        .send({
          name: 'Updated Meme',
          info: 'This is the updated meme!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedMeme = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedMeme = {};
    });

    it('should respond with the updated meme', function() {
      expect(updatedMeme.name).to.equal('Updated Meme');
      expect(updatedMeme.info).to.equal('This is the updated meme!!!');
    });

    it('should respond with the updated meme on a subsequent GET', function(done) {
      request(app)
        .get(`/api/memes/${newMeme._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let meme = res.body;

          expect(meme.name).to.equal('Updated Meme');
          expect(meme.info).to.equal('This is the updated meme!!!');

          done();
        });
    });
  });

  describe('PATCH /api/memes/:id', function() {
    var patchedMeme;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/memes/${newMeme._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Meme' },
          { op: 'replace', path: '/info', value: 'This is the patched meme!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedMeme = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedMeme = {};
    });

    it('should respond with the patched meme', function() {
      expect(patchedMeme.name).to.equal('Patched Meme');
      expect(patchedMeme.info).to.equal('This is the patched meme!!!');
    });
  });

  describe('DELETE /api/memes/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/memes/${newMeme._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when meme does not exist', function(done) {
      request(app)
        .delete(`/api/memes/${newMeme._id}`)
        .expect(404)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });
  });
});
