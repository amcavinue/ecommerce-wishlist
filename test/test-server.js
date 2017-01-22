const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const expect = chai.expect;
const fs = require('fs');

chai.use(chaiHttp);

var server = require('../server.js');
const app = server.app;

describe('Wishlist Server', () => {
  before((done) => {
    server.runServer(() => {
      done();
    });
  });
  
  it('should start the server', (done) => {
    done();
  });
  
  after((done) => {
    done();
  });
});