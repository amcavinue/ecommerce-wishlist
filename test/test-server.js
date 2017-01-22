const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const expect = chai.expect;
const fs = require('fs');
const mongoose = require('mongoose');

chai.use(chaiHttp);

const server = require('../server.js');
const User = require('../models/user');
const app = server.app;

describe('Wishlist Server', () => {
  before((done) => {
    server.runServer(() => {
      done();
    });
  });
  
  it('should create a new user', (done) => {
    chai.request(app)
      .post('/api/newUser')
      .send({'username': 'testUser0', 'password': 'testUser0'})
      .end(function(err, res) {
        should.equal(err, null);
        res.should.have.status(201);
        done();
      });
  });
  
  it('validate a username and password', (done) => {
    chai.request(app)
      .post('/api/login')
      .send({'username': 'testUser0', 'password': 'testUser0'})
      .end(function(err, res) {
        should.equal(err, null);
        res.should.have.status(201);
        done();
      });
    done();
  });
  
  after((done) => {
    User.findOneAndRemove({username: 'testUser0'}).exec();
    done();
  });
});