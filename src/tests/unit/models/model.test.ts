import { expect } from 'chai';
import Sinon from 'sinon';
import CarModel, { CarDocument } from '../../../models/Car';
import { Model } from 'mongoose';

const functions = {
  create: Sinon.stub().resolves(),
  find: Sinon.stub().resolves(),
  findOne: Sinon.stub().resolves(),
  findOneAndUpdate: Sinon.stub().resolves(),
  findOneAndDelete: Sinon.stub().resolves(),
};

describe('Model', () => {
  const modelStub = () => functions;

  const model = new CarModel(
    modelStub() as unknown as Model<CarDocument, {}, {}, {}>,
  );

  it('exist', () => {
    expect(model).to.be.an('object');
  });

  it('CRUD functions exist', () => {
    expect(model.create).to.be.an('function');
    expect(model.delete).to.be.an('function');
    expect(model.read).to.be.an('function');
    expect(model.readOne).to.be.an('function');
    expect(model.update).to.be.an('function');
  });
  const carExemple = {
    _id: '628fafea3b94a2894ec3f9e7',
    model: 'aaa',
    year: 1902,
    color: 'bbb',
    status: true,
    buyValue: 2,
    doorsQty: 2,
    seatsQty: 2
  }

  describe('CRUD functions working', () => {
    it('create', async () => {
      await model.create(carExemple);
      expect(functions.create.called).to.be.true;
    });
    it('delete', async () => {
      await model.delete(carExemple._id);
      expect(functions.findOneAndDelete.called).to.be.true;
    });
    it('read', async () => {
      await model.read();
      expect(functions.find.called).to.be.true;
    });
    it('readOne', async () => {
      await model.readOne(carExemple._id);
      expect(functions.findOne.called).to.be.true;
    });
    it('update', async () => {
      await model.update(carExemple._id, carExemple);
      expect(functions.findOneAndUpdate.called).to.be.true;
    });
  });
  describe("CarModel", () => {
    let carModel =  new CarModel();
    describe(('create'), () => {
      before(() => {
        Sinon.stub(carModel, 'create').resolves(carExemple)
      })
      after(() => {
        (carModel.create as Sinon.SinonStub).restore()
      })
      it(('retorna um objeto'), async() => {
        const carCreate = await carModel.create(carExemple);
  
        expect(carCreate).to.be.an('object');
        expect(carCreate).to.have.property('model');
        expect(carCreate).to.have.property('year');
        expect(carCreate).to.have.property('color');
        expect(carCreate).to.have.property('buyValue');
        expect(carCreate).to.have.property('seatsQty');
        expect(carCreate).to.have.property('doorsQty');
      })
    })
  })
});