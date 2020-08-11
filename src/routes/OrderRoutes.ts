import * as express  from 'express';
import { OrderController } from '../controllers/OrderController';

const orderController = new OrderController();

const OrderRouter = express.Router();

OrderRouter.get('/order',orderController.list);

OrderRouter.get('/order/:userId',orderController.find);

OrderRouter.post('/order',orderController.create);
OrderRouter.put('/order', orderController.update);

export { OrderRouter };