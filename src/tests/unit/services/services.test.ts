import { expect } from 'chai';
import { describe } from 'mocha';
import Sinon from 'sinon';
import CarModel from '../../../models/Car';
import CarService from '../../../services/Car';

describe('CarService', () => {
  let carModel = new CarModel();
  let carService = new CarService(carModel);

  describe('CRUD functions working', () => {
    const carExemple = {
      _id: '628fafea3b94a2894ec3f9e7',
      model: 'aaa',
      year: 1902,
      color: 'bbb',
      status: true,
      buyValue: 2,
      doorsQty: 2,
      seatsQty: 2,
    };
    const carExempleNoId = {
      model: 'aaa',
      year: 1902,
      color: 'bbb',
      status: true,
      buyValue: 2,
      doorsQty: 2,
      seatsQty: 2,
    };

    describe('create', () => {
      before(() => {
        Sinon.stub(carModel, 'create').resolves(carExemple);
      });
      after(() => {
        (carModel.create as Sinon.SinonStub).restore();
      });
      it('teste se cria um carro', async () => {
        const carCreate = await carService.create(carExemple);

        expect(carCreate).to.be.an('object');
        expect(carCreate).to.have.property('_id');
        expect(carCreate).to.have.property('model');
        expect(carCreate).to.have.property('year');
        expect(carCreate).to.have.property('color');
        expect(carCreate).to.have.property('buyValue');
        expect(carCreate).to.have.property('doorsQty');
        expect(carCreate).to.have.property('seatsQty');
      });
    });
    describe('readOne', () => {
      before(() => {
        Sinon.stub(carModel, 'readOne').resolves(carExemple);
      });

      after(() => {
        (carModel.readOne as Sinon.SinonStub).restore();
      });
      it('retorna um carro', async () => {
        const carReadOne = await carService.readOne(carExemple._id);
        expect(carReadOne).to.be.an('object');
        expect(carReadOne).to.have.property('_id');
        expect(carReadOne).to.have.property('model');
        expect(carReadOne).to.have.property('year');
        expect(carReadOne).to.have.property('color');
        expect(carReadOne).to.have.property('buyValue');
        expect(carReadOne).to.have.property('doorsQty');
        expect(carReadOne).to.have.property('seatsQty');
      });
    });
    describe('update', () => {
      before(() => {
        Sinon.stub(carModel, 'update').resolves(carExemple);
      });

      after(() => {
        (carModel.update as Sinon.SinonStub).restore();
      });

      it('retorna o carro atualizado', async () => {
        const carUpdate = await carService.update(carExemple._id, carExempleNoId);
        expect(carUpdate).to.be.an('object');
        expect(carUpdate).to.have.property('_id');
        expect(carUpdate).to.have.property('model');
        expect(carUpdate).to.have.property('year');
        expect(carUpdate).to.have.property('color');
        expect(carUpdate).to.have.property('buyValue');
        expect(carUpdate).to.have.property('doorsQty');
        expect(carUpdate).to.have.property('seatsQty');
      });
    });

    describe('delete', () => {
      before(() => {
        Sinon.stub(carModel, 'delete').resolves(carExemple);
      });

      after(() => {
        (carModel.delete as Sinon.SinonStub).restore();
      });

      it('retorna o carro removido', async () => {
        const carDelete = await carService.delete(carExemple._id);
        expect(carDelete).to.be.an('object');
      });
    });
    describe('read', () => {
      before(() => {
        Sinon.stub(carModel, 'read').resolves([carExemple]);
      });

      after(() => {
        (carModel.read as Sinon.SinonStub).restore();
      });
      it('retorna uma "lista" de carros', async () => {
        const carRead = await carService.read();
        expect(carRead).to.be.an('array');
        expect(carRead[0]).to.be.an('object');
        expect(carRead[0]).to.have.property('_id');
        expect(carRead[0]).to.have.property('model');
        expect(carRead[0]).to.have.property('year');
        expect(carRead[0]).to.have.property('color');
        expect(carRead[0]).to.have.property('buyValue');
        expect(carRead[0]).to.have.property('doorsQty');
        expect(carRead[0]).to.have.property('seatsQty');
      });
    });
  });
});
