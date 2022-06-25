import chai from 'chai';
import chaiHttp = require('chai-http');
import CarModel from '../../../models/Car';
import server from '../../../server';
import mongoose from 'mongoose';
import Sinon from 'sinon';
import { Motorcycle } from '../../../interfaces/MotorcycleInterface';
import MotorcycleModel from '../../../models/Motorcycle';

chai.use(chaiHttp);

const { expect } = chai;

const carExemple = {
  model: 'aaa',
  year: 1992,
  color: 'bbb',
  status: true,
  buyValue: 2,
  doorsQty: 2,
  seatsQty: 2,
};

const motorcycles = {
  model: 'aaa',
  year: 1992,
  color: 'bbb',
  buyValue: 2,
  status: true,
  category: 'Street',
  engineCapacity: 2,
};

const carExempleId = {
  _id: '628fafea3b94a2894ec3f9e7',
  model: 'aaa',
  year: 1992,
  color: 'bbb',
  status: true,
  buyValue: 2,
  doorsQty: 2,
  seatsQty: 2,
};

const motorcyclesId = {
  _id: '628fafea3b94a2894ec3f9e7',
  model: 'aaa',
  year: 1992,
  color: 'bbb',
  buyValue: 2,
  status: true,
  category: 'Street',
  engineCapacity: 2,
};

describe('Controller', () => {
  before(() => {
    mongoose.createConnection('mongodb://mongodb:27017/CarShop');
  });

  after(() => {
    mongoose.connection.close();
  });

  server.startServer();
  const app = server.getApp();

  describe('CarController', () => {
    const carModel = new CarModel();
    describe('create', () => {
      it('create car', async () => {
        const responseCreate = await chai.request(app).post('/cars').send(carExemple);
        expect(responseCreate.status).to.be.equal(201);
      });
    });

    describe('read', () => {
      it('car read', async () => {
        const responseRead = await chai.request(app).get('/cars');
        expect(responseRead.status).to.be.equal(200);
      });
    });

    describe('readOne', () => {
      let mocks: any;
      before(async () => {
        Sinon.stub(carModel, 'readOne').resolves(carExempleId);
        await chai.request(app).post('/cars').send(carExemple);
        const request = await chai.request(app).get('/cars');
        mocks = request.body;
      });

      after(() => {
        (carModel.readOne as Sinon.SinonStub).restore();
      });

      it('car readOne sucesso', async () => {
        const responseReadOne = await chai.request(app).get(`/cars/${mocks[0]._id}`);
        expect(responseReadOne.status).to.be.equal(200);
      });

      it('car readOne falha não encontra id', async () => {
        const responseReadOne = await chai
          .request(app)
          .get(`/cars/111aaaaa3a94a2894aa3f9e7`);
        expect(responseReadOne.status).to.be.equal(404);
      });

      it('car readOne falha id não é hexadecimal', async () => {
        const responseReadOne = await chai.request(app).get(`/cars/0`);
        expect(responseReadOne.status).to.be.equal(400);
      });
    });

    describe('update', () => {
      let mocks: any;

      before(async () => {
        Sinon.stub(carModel, 'update').resolves(carExempleId);
        await chai.request(app).post('/cars').send(carExemple);
        const request = await chai.request(app).get('/cars');
        mocks = request.body;
      });

      after(() => {
        (carModel.update as Sinon.SinonStub).restore();
      });

      it('car update sucesso', async () => {
        const responseUpdate = await chai
          .request(app)
          .put(`/cars/${mocks[0]._id}`)
          .send(carExemple);
        expect(responseUpdate.status).to.be.equal(200);
      });

      it('car update falha não encontra id', async () => {
        const responseUpdate = await chai
          .request(app)
          .put(`/cars/111aaaaa3a94a2894aa3f9e7`)
          .send(carExemple);
        expect(responseUpdate.status).to.be.equal(404);
      });

      it('car update falha id não é hexadecimal', async () => {
        const responseUpdate = await chai.request(app).put(`/cars/0`).send(carExemple);
        expect(responseUpdate.status).to.be.equal(400);
      });
    });

    describe('delete', () => {
      let mocks: any;

      before(async () => {
        Sinon.stub(carModel, 'delete').resolves(carExempleId);
        await chai.request(app).post('/cars').send(carExemple);
        const request = await chai.request(app).get('/cars');
        mocks = request.body;
      });

      after(() => {
        (carModel.delete as Sinon.SinonStub).restore();
      });

      it('car delete sucesso', async () => {
        const responseDelete = await chai.request(app).delete(`/cars/${mocks[0]._id}`);
        expect(responseDelete.status).to.be.equal(204);
      });

      it('car delete falha não encontra id', async () => {
        const responseDelete = await chai
          .request(app)
          .delete(`/cars/111aaaaa3a94a2894aa3f9e7`);
        expect(responseDelete.status).to.be.equal(404);
      });

      it('car delete falha id não é hexadecimal', async () => {
        const responseDelete = await chai.request(app).delete(`/cars/0`);
        expect(responseDelete.status).to.be.equal(400);
      });
    });
  });

  describe('MotorcycleController', () => {
    const motorcycleModel = new MotorcycleModel();

    describe('create', () => {
      it('create motorcycles', async () => {
        const responseCreate = await chai
          .request(app)
          .post('/motorcycles')
          .send(motorcycles);
        expect(responseCreate.status).to.be.equal(201);
      });
    });

    describe('read', () => {
      it('motorcycles read', async () => {
        const responseRead = await chai.request(app).get('/motorcycles');
        expect(responseRead.status).to.be.equal(200);
      });
    });

    describe('readOne', () => {
      let mocks: any;
      before(async () => {
        Sinon.stub(motorcycleModel, 'readOne').resolves(motorcyclesId as Motorcycle);
        await chai.request(app).post('/motorcycles').send(motorcycles);
        const request = await chai.request(app).get('/motorcycles');
        mocks = request.body;
      });

      after(() => {
        (motorcycleModel.readOne as Sinon.SinonStub).restore();
      });

      it('motorcycles readOne sucesso', async () => {
        const responseReadOne = await chai
          .request(app)
          .get(`/motorcycles/${mocks[0]._id}`);
        expect(responseReadOne.status).to.be.equal(200);
      });

      it('motorcycles readOne falha não encontra id', async () => {
        const responseReadOne = await chai
          .request(app)
          .get(`/motorcycles/111aaaaa3a94a2894aa3f9e7`);
        expect(responseReadOne.status).to.be.equal(404);
      });

      it('motorcycles readOne falha id não é hexadecimal', async () => {
        const responseReadOne = await chai.request(app).get(`/motorcycles/0`);
        expect(responseReadOne.status).to.be.equal(400);
      });
    });

    describe('update', () => {
      let mocks: any;
      before(async () => {
        Sinon.stub(motorcycleModel, 'update').resolves(motorcyclesId as Motorcycle);
        await chai.request(app).post('/motorcycles').send(motorcycles);
        const request = await chai.request(app).get('/motorcycles');
        mocks = request.body;
      });

      after(() => {
        (motorcycleModel.update as Sinon.SinonStub).restore();
      });

      it('motorcycles update sucesso', async () => {
        const responseUpdate = await chai
          .request(app)
          .put(`/motorcycles/${mocks[0]._id}`)
          .send(motorcycles);
        expect(responseUpdate.status).to.be.equal(200);
      });

      it('motorcycles update falha não encontra id', async () => {
        const responseUpdate = await chai
          .request(app)
          .put(`/motorcycles/111aaaaa3a94a2894aa3f9e7`)
          .send(motorcycles);
        expect(responseUpdate.status).to.be.equal(404);
      });

      it('motorcycles update falha id não é hexadecimal', async () => {
        const responseUpdate = await chai
          .request(app)
          .put(`/motorcycles/0`)
          .send(motorcycles);
        expect(responseUpdate.status).to.be.equal(400);
      });
    });

    describe('delete', () => {
      let mocks: any;
      before(async () => {
        Sinon.stub(motorcycleModel, 'delete').resolves(motorcyclesId as Motorcycle);
        await chai.request(app).post('/motorcycles').send(motorcycles);
        const request = await chai.request(app).get('/motorcycles');
        mocks = request.body;
      });

      after(() => {
        (motorcycleModel.delete as Sinon.SinonStub).restore();
      });

      it('motorcycles delete sucesso', async () => {
        const responseDelete = await chai
          .request(app)
          .delete(`/motorcycles/${mocks[0]._id}`);
        expect(responseDelete.status).to.be.equal(204);
      });

      it('motorcycles delete falha não encontra id', async () => {
        const responseDelete = await chai
          .request(app)
          .delete(`/motorcycles/111aaaaa3a94a2894aa3f9e7`);
        expect(responseDelete.status).to.be.equal(404);
      });

      it('motorcycles delete falha id não é hexadecimal', async () => {
        const responseDelete = await chai.request(app).delete(`/motorcycles/0`);
        expect(responseDelete.status).to.be.equal(400);
      });
    });
  });
});
