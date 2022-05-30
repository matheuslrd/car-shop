import { ZodError } from 'zod';
import { Model } from '../interfaces/ModelInterface';

export interface MongoServiceError {
  error: ZodError;
}

abstract class MongoService<T> {
  constructor(protected model: Model<T>) {}

  public async read(): Promise<T[]> {
    return this.model.read();
  }

  public async readOne(id: string): Promise<T | null | MongoServiceError> {
    return this.model.readOne(id);
  }

  public async delete(id: string): Promise<T | null | MongoServiceError> {
    return this.model.delete(id);
  }
}

export default MongoService;
