import * as express from 'express';
import { PaymentMethodController } from '../controllers/PaymentMethodController';

const paymentMethodController = new PaymentMethodController();


const PaymentMethodRouter = express.Router();

PaymentMethodRouter.get('/paymentmethods/:id', paymentMethodController.find);
PaymentMethodRouter.get('/paymentmethods', paymentMethodController.list);

PaymentMethodRouter.post('/paymentmethods', paymentMethodController.create);

PaymentMethodRouter.put('/paymentmethods', paymentMethodController.update);

PaymentMethodRouter.delete('/paymentmethods', paymentMethodController.delete);


export { PaymentMethodRouter };