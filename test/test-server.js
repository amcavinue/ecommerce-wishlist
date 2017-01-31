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
  let webToken;
  
  before((done) => {
    server.runServer(() => {
      done();
    });
  });
  
  it('should create a new user', (done) => {
    chai.request(app)
      .post('/api/users')
      .send({'username': 'testUser0', 'password': 'testUser0'})
      .end(function(err, res) {
        should.equal(err, null);
        res.should.have.status(201);
        done();
      });
  });
  
  it('should validate a username and password', (done) => {
    chai.request(app)
      .post('/api/login')
      .send({'username': 'testUser0', 'password': 'testUser0'})
      .end(function(err, res) {
        webToken = res.body.token;
        should.equal(err, null);
        res.should.have.status(200);
        done();
      });
  });
  
  it('should validate a restricted endpoint', (done) => {
    chai.request(app)
      .get('/api/restricted')
      .set('Authorization', 'Bearer ' + webToken)
      .send({'username': 'testUser0', 'password': 'testUser0'})
      .end(function(err, res) {
        should.equal(err, null);
        res.should.have.status(200);
        done();
      });
  });
  
  it('should get data from Amazon', (done) => {
    chai.request(app)
      .get('/api/products/' + encodeURIComponent('soft towels'))
      .end(function(err, res) {
        should.equal(err, null);
        res.should.have.status(200);
        expect(res.body).to.be.an('array');
        done();
      });
  });
  
  it('should get a single item from Amazon', function(done) {
    this.timeout(3000);
    setTimeout(() => {
      chai.request(app)
      .get('/api/products/asins/' + encodeURIComponent('B00GXUVOME'))
      .end(function(err, res) {
        should.equal(err, null);
        res.should.have.status(200);
        should.equal(res.body[0].asin, 'B00GXUVOME');
        done();
      });
    }, 1000); // Wait for 1 second to make sure not to hit the Amazon API limit.
  });
  
  it('should add an item to the wishlist', function(done) {
    chai.request(app)
      .post('/api/wishlists/testUser0')
      .send({
        item: {
          title: 'test item',
          img: 'test.jpg',
          price: '$000.00',
          description: [
            'abc',
            'def'
          ],
          asin: '12345',
          link: 'www.test.com'
        }
      })
      .end(function(err, res) {
        should.equal(err, null);
        res.should.have.status(201);
        done();
      });
  });
  
  after((done) => {
    User.findOneAndRemove({username: 'testUser0'}).exec();
    done();
  });
});