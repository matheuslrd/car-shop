import { Document, model as createModel, Schema } from 'mongoose';
import { Car } from '../interfaces/CarInterface';
import MongoModel from './MongoModel';

interface CarDocument extends Car, Document { }

const carSchema = new Schema<CarDocument>({
  status: { type: String, required: false },
  model: String,
  year: Number,
  color: String,
  buyValue: Number,
  doorsQty: Number,
  seatsQty: Number,
}, {
  versionKey: false,
});

class CarModel extends MongoModel<Car> {
  constructor(private carModel = createModel('cars', carSchema)) {
    super(carModel);
  }
}

export default CarModel;
