import * as express  from 'express';
import { PaymentController } from '../controllers/PaymentController';

const paymentController = new PaymentController();


const PaymentRouter = express.Router();

PaymentRouter.get('/payment',paymentController.list);
PaymentRouter.get('/payment/:userId',paymentController.findByUser);
PaymentRouter.get('/payment/:orderId',paymentController.findByOrder);
PaymentRouter.get('/payment/:id',paymentController.find);

PaymentRouter.post('/payment',paymentController.create);
PaymentRouter.post('/payment/callback',paymentController.receiveNotification);

PaymentRouter.put('/payment',paymentController.update);

PaymentRouter.delete('/payment/:orderId',paymentController.delete);

export {PaymentRouter};