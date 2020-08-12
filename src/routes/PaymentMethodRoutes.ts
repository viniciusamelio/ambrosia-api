import * as express from 'express';
import { PaymentMethodController } from '../controllers/PaymentMethodController';

const paymentMethodController = new PaymentMethodController();


const PaymentMethodRouter = express.Router();

PaymentMethodRouter.get('/paymentmethod/:id', paymentMethodController.find);
PaymentMethodRouter.get('/paymentmethod', paymentMethodController.list);

PaymentMethodRouter.post('/paymentmethod', paymentMethodController.create);

PaymentMethodRouter.put('/paymentmethod', paymentMethodController.update);

PaymentMethodRouter.delete('/paymentmethod', paymentMethodController.delete);


export { PaymentMethodRouter };