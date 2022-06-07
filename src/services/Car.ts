import { Car, CarSchema } from '../interfaces/CarInterface';
import CarModel from '../models/Car';
import MongoService from './MongoService';

class CarService extends MongoService<Car> {
  constructor(private carModel = new CarModel()) {
    super(carModel);
  }

  create = async (obj: Car) => {
    const parsed = CarSchema.safeParse(obj);

    if (!parsed.success) {
      return { error: parsed.error };
    }

    return this.carModel.create(obj);
  };

  read = async (): Promise<Car[]> => this.carModel.read();
}

export default CarService;
