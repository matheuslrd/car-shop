import {
  MotorcycleSchema, Motorcycle } from '../interfaces/MotorcycleInterface';
import MongoService, { MongoServiceError } from './MongoService';
import MotorcycleModel from '../models/Motorcycle';

class MotorcycleService extends MongoService<Motorcycle> {
  constructor(model = new MotorcycleModel()) {
    super(model);
  }

  create = async (
    obj: Motorcycle,
  ): Promise<Motorcycle | MongoServiceError | null> => {
    const parsed = MotorcycleSchema.safeParse(obj);
    if (!parsed.success) {
      return { error: parsed.error };
    }
    return this.model.create(obj);
  };
}

export default MotorcycleService;
