import CarController from './controllers/Car';
import { Car } from './interfaces/CarInterface';
import CustomRouter from './routes/Router';
import App from './app';
import { Motorcycle } from './interfaces/MotorcycleInterface';
import MotorcycleController from './controllers/MotorcycleController';

const server = new App();

const carController = new CarController();
const motorcycleController = new MotorcycleController();

const carRouter = new CustomRouter<Car>();
const motorcycleRouter = new CustomRouter<Motorcycle>();

carRouter.addRoute(carController);
motorcycleRouter.addRoute(motorcycleController);

server.addRouter(carRouter.router);
server.addRouter(motorcycleRouter.router);

export default server;
