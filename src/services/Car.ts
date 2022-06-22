import { Car, CarSchema } from '../interfaces/CarInterface';
import { IdZodSchema } from '../interfaces/ZodInterfaces';
import CarModel from '../models/Car';
import MongoService, { MongoServiceError } from './MongoService';

class CarService extends MongoService<Car> {
  constructor(private carModel = new CarModel()) {
    super(carModel);
  }

  create = async (obj: Car): Promise<Car | MongoServiceError | null> => {
    const parsed = CarSchema.safeParse(obj);

    if (!parsed.success) {
      return { error: parsed.error };
    }

    return this.carModel.create(obj);
  };

  read = async (): Promise<Car[]> => this.carModel.read();

  readOne = async (
    id: string,
  ): Promise<Car | null | MongoServiceError> => {
    const parsed = IdZodSchema.safeParse({ id });
    
    if (!parsed.success) {      
      return { error: parsed.error };
    }
    const car = this.carModel.readOne(id);
    return car;
  };
}

export default CarService;
