const chai = require('chai');
const expect = require('chai').expect;
const chaiHttp = require('chai-http');
const server = require('../src/app');
chai.use(chaiHttp);
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

let token1, token2;

// chai.request('http://localhost:8080/').get;

describe('Health check', () => {
  it('Health check status is ok', done => {
    chai
      .request(server)
      .get('/evcharge/api/admin/healthcheck')
      .end((err, res) => {
        expect(res.body).to.have.property('Status', 'OK');
        done();
      });
  });
});

describe('Resseting the sessions', () => {
  it('Sessions is reset', done => {
    chai
      .request(server)
      .get('/evcharge/api/admin/resetSessions')
      .end((err, res) => {
        expect(res.body).to.have.property('Status', 'OK');
        done();
      });
  });
});

describe('Admin Login', () => {
  it('Admin should log in', done => {
    chai
      .request(server)
      .post('/evcharge/api/login')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({ username: 'SeCre', password: 'password' })
      .end((err, res) => {
        expect(res.body).to.have.key('token');
        token1 = res.body.token;
        done();
      });
  });
});

describe('Add user', () => {
  it('Admin adds a new user', done => {
    chai
      .request(server)
      .post('/evcharge/api/admin/usermod/Tester/testing')
      .set({
        'XOBSERVATORY-AUTH': token1,
        'content-type': 'application/json',
      })
      .send({
        username: 'Babis',
        password: '123456',
        email: 'babis@gmail.com',
        rights: 'customer',
      })
      .end((err, res) => {
        expect(res.status).to.eql(200);
        done();
      });
  });
});

describe('Upload new data', () => {
  it('Admin uploads new data', done => {
    chai
      .request(server)
      .post('/evcharge/api/admin/system/sessionsupd')
      .set('XOBSERVATORY-AUTH', token1)
      .attach('file', fs.readFileSync('./test/test.csv'), 'test.csv')
      .end((err, res) => {
        // console.log(err);
        // console.log(res);
        expect(res.body).to.eql({
          SessionsInUploadedFile: 1,
          SessionsImported: 1,
          TotalSessionsInDatabase: 1,
        });
        done();
      });
  });
});

describe('Update user password', () => {
  it('User data should be updated', done => {
    chai
      .request(server)
      .post('/evcharge/api/admin/usermod/Tester/testingupdated')
      .set({
        'XOBSERVATORY-AUTH': token1,
        'content-type': 'application/x-www-form-urlencoded',
      })
      .end((err, res) => {
        expect(res.status).to.eql(200);
        done();
      });
  });
});

describe('Retrieve user information', () => {
  it('User info should be retrieved', done => {
    chai
      .request(server)
      .get('/evcharge/api/admin/users/Tester')
      .set({
        'XOBSERVATORY-AUTH': token1,
        'content-type': 'application/x-www-form-urlencoded',
      })
      .end((err, res) => {
        expect(res.body.email).to.equal('babis@gmail.com');
        done();
      });
  });
});

describe('User login', () => {
  it('User should login', done => {
    chai
      .request(server)
      .post('/evcharge/api/login')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({ username: 'Tester', password: 'testingupdated' })
      .end((err, res) => {
        expect(res.body).to.have.key('token');
        token2 = res.body.token;
        done();
        // server.close();
      });
  });
});

// server.stop;
// chai.request(server.stop());

describe(' Sessions Per Point from Admin', () => {
  it('Sessions info should be retrieved. I should get a res(200). ', done => {
    chai
      .request(server)
      .get(
        '/evcharge/api/SessionsPerPoint/1/20190303_from/20220303_to?format=json'
      )
      .set({
        'XOBSERVATORY-AUTH': token1,
      })
      .end((err, res) => {
        expect(res.status).to.eql(200);
        done();
      });
  });

  it('Exact Sessions info should be retrieved ', done => {
    chai
      .request(server)
      .get(
        '/evcharge/api/SessionsPerPoint/1/20190303_from/20220303_to?format=json'
      )
      .set({
        'XOBSERVATORY-AUTH': token1,
      })
      .end((err, res) => {
        expect(res.body).to.eql({
          Point: '1',
          PointOperator: 'reyma',
          RequestTimestamp: res.body.RequestTimestamp,
          PeriodFrom: '20190303',
          PeriodTo: '20220303',
          NumberOfChargingSessions: 1,
          SessionIndex: [1],
          SessionID: [1],
          StartedOn: ['2020-06-15 06:28:01'],
          FinishedOn: ['2020-06-15 10:51:18'],
          Protocol: ['fast'],
          EnergyDelivered: [276],
          Payment: ['card'],
          VehicleType: ['Sedan'],
        });
        done();
      });
  });
});

describe(' Sessions Per Station from Admin', () => {
  it('Sessions info should be retrieved. I should get a res(200). ', done => {
    chai
      .request(server)
      .get('/evcharge/api/SessionsPerStation/1/20150303_from/20220303_to')
      .set({
        'XOBSERVATORY-AUTH': token1,
      })
      .end((err, res) => {
        expect(res.status).to.eql(200);
        done();
      });
  });

  it('Exact Sessions info should be retrieved ', done => {
    chai
      .request(server)
      .get('/evcharge/api/SessionsPerStation/1/20150303_from/20220303_to')
      .set({
        'XOBSERVATORY-AUTH': token1,
      })
      .end((err, res) => {
        expect(res.body).to.eql({
          StationID: '1',
          Operator: 'stationAdmin',
          RequestTimestamp: res.body.RequestTimestamp,
          PeriodFrom: '20150303',
          PeriodTo: '20220303',
          TotalEnergyDelivered: 276,
          NumberOfChargingSessions: 1,
          NumberOfActivePoints: 1,
          PointID: [1],
          PointSessions: [1],
          EnergyDelivered: [276],
        });
        done();
      });
  });
});

describe(' Sessions Per EV from Admin', () => {
  it('Sessions info should be retrieved. I should get a res(200). ', done => {
    chai
      .request(server)
      .get(
        '/evcharge/api/SessionsPerEV/1/20190303_from/20220303_to?format=json'
      )
      .set({
        'XOBSERVATORY-AUTH': token1,
      })
      .end((err, res) => {
        expect(res.status).to.eql(200);
        done();
      });
  });

  it('Exact Sessions info should be retrieved ', done => {
    chai
      .request(server)
      .get(
        '/evcharge/api/SessionsPerEV/1/20190303_from/20220303_to?format=json'
      )
      .set({
        'XOBSERVATORY-AUTH': token1,
      })
      .end((err, res) => {
        expect(res.body).to.eql({
          VehicleID: '1',
          RequestTimestamp: res.body.RequestTimestamp,
          PeriodFrom: '20190303',
          PeriodTo: '20220303',
          TotalEnergyConsumed: 276,
          NumberOfVisitedPoints: 1,
          NumberOfVehicleChargingSessions: 1,
          SessionIndex: [1],
          SessionID: [1],
          EnergyProvider: ['deh'],
          StartedOn: ['2020-06-15 06:28:01'],
          FinishedOn: ['2020-06-15 06:28:01'],
          EnergyDelivered: [276],
          CostPerKWh: [0.22],
          SessionCost: [60.72],
        });
        done();
      });
  });
});

describe(' Sessions Per Provider from Admin', () => {
  it('Sessions info should be retrieved. I should get a res(200). ', done => {
    chai
      .request(server)
      .get(
        '/evcharge/api/SessionsPerProvider/1/20110303_from/20220303_to?format=json'
      )
      .set({
        'XOBSERVATORY-AUTH': token1,
      })
      .end((err, res) => {
        expect(res.status).to.eql(200);
        done();
      });
  });

  it('Exact Sessions info should be retrieved ', done => {
    chai
      .request(server)
      .get(
        '/evcharge/api/SessionsPerProvider/1/20110303_from/20220303_to?format=json'
      )
      .set({
        'XOBSERVATORY-AUTH': token1,
      })
      .end((err, res) => {
        expect(res.body).to.eql({
          ProviderID: '1',
          ProviderName: 'deh',
          StationID: [1],
          SessionID: [1],
          vehicleID: [1],
          StartedOn: ['2020-06-15 06:28:01'],
          FinishedOn: ['2020-06-15 10:51:18'],
          EnergyDelivered: [276],
          CostPerKWh: 0.22,
          SessionCost: [60.72],
          TotalCost: 60.72,
        });
        done();
      });
  });
});

describe('Admin Logout', () => {
  it('Admin should logout', done => {
    chai
      .request(server)
      .post('/evcharge/api/logout')
      .set('XOBSERVATORY-AUTH', token1)
      .end((err, res) => {
        expect(res.status).to.eql(200);
        done();
      });
  });
});
