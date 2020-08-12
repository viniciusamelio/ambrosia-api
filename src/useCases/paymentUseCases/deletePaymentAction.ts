import {Request} from 'express';
import { PaymentRepository } from '../../repositories/PaymentRepository';



export class DeletePaymentAction{
    constructor(private paymentRepository: PaymentRepository){}

    async index(request: Request){
        try {

            const {paymentId} = request.body;

            const payment = await this.paymentRepository.delete(paymentId);
            
            return payment;
        } catch (error) {
            return {error: error.message};
        }
    }

}
