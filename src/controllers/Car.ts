import { Request, Response } from 'express';

import Controller, { RequestWithBody, ResponseError } from './MongoController';
import CarService from '../services/Car';
import { Car } from '../interfaces/CarInterface';

class CarController extends Controller<Car> {
  private _route: string;

  constructor(public service = new CarService(), route = '/cars') {
    super(service);
    this._route = route;
  }

  get route() {
    return this._route;
  }

  create = async (
    req: RequestWithBody<Car>,
    res: Response<Car | ResponseError>,
  ): Promise<typeof res> => {
    const { body } = req;
    try {
      const car = await this.service.create(body);
      if (!car) {
        return res.status(500).json({ error: this.errors.internal });
      }
      if ('error' in car) {
        return res.status(400).json(car);
      }
      return res.status(201).json(car);
    } catch (err) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };

  read = async (
    _req: Request,
    res: Response<Car[] | ResponseError>,
  ): Promise<typeof res> => {
    try {
      const cars = await this.service.read();
      return res.status(200).json(cars);
    } catch (error) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };

  readOne = async (
    req: Request<{ id: string }>,
    res: Response<Car | ResponseError>,
  ): Promise<typeof res> => {
    const { id } = req.params;

    try {
      const car = await this.service.readOne(id);

      if (!car) return res.status(404).json({ error: this.errors.notFound });
      if ('error' in car) {
        return res.status(400).json({ error: this.errors.idLength });
      }
      return res.status(200).json(car);
    } catch (error) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };

  update = async (
    req: Request<{ id: string }>,
    res: Response<Car | ResponseError>,
  ): Promise<typeof res> => {
    const { id } = req.params;
    const { body } = req;

    if (Object.keys(body).length === 0) {
      return res.status(400).json({ error: this.errors.badRequest });
    }

    if (id.length < 24) {
      return res.status(400).json({ error: this.errors.idHexadecimal });
    }
    const car = await this.service.update(id, body);
    if (!car) return res.status(404).json({ error: this.errors.notFound });
    return res.status(200).json(car);
  };

  delete = async (
    req: Request<{ id: string }>,
    res: Response<Car | ResponseError>,
  ): Promise<typeof res> => {
    const { id } = req.params;

    if (id.length < 24) {
      return res.status(400).json({ error: this.errors.idHexadecimal });
    }
    const car = await this.service.delete(id);
    if (!car) return res.status(404).json({ error: this.errors.notFound });

    return res.status(204).json(car);
  };
}

export default CarController;
