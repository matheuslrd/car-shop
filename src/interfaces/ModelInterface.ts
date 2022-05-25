export interface Model<T> {
  create(objeto: T): Promise<T>;
  read(): Promise<T[]>;
  readOne(value: string): Promise<T | null>;
  update(value: string, objeto: T): Promise<T | null>;
  delete(value: string): Promise<T | null>;
}
