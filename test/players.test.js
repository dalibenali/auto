'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');
const should = chai.should();


chai.use(chaiHttp);

describe('/GET Tennis Players', () => {
  it('it should GET all tennis players', (done) => {
    chai.request(server)
      .get('/players')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.a.property('players');
        res.body.players.should.be.a('array');
        res.body.players.forEach(element => {
          element.should.have.keys('id', 'firstname', 'lastname', 'shortname', 'sex', 'country', 'data', 'picture');
          element.country.should.have.keys('picture', 'code');
          element.data.should.have.keys('rank', 'points', 'weight', 'height', 'age', 'last');
        });
        done();
      });
  });

  it('it should GET tennis player by id', (done) => {
    const playerId = 52; // existing player id
    chai.request(server)
      .get('/players/' + playerId)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.keys('id', 'firstname', 'lastname', 'shortname', 'sex', 'country', 'picture', 'data');
        res.body.country.should.have.keys('picture', 'code');
        res.body.data.should.have.keys('rank', 'points', 'weight', 'height', 'age', 'last');
        res.body.data.should.be.a('object');
        done();
      });
  });

  it('it should return 404 if not found player', (done) => {
    const playerId = 99; // not existing player id
    chai.request(server)
      .get('/players/' + playerId)
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });

});
