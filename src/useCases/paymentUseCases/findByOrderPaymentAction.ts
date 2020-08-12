import {Request} from 'express';
import { PaymentRepository } from '../../repositories/PaymentRepository';



export class FindByOrderPaymentAction{
    constructor(private paymentRepository: PaymentRepository){}

    async index(request: Request){
        try {

            const {orderId} = request.params;

            const payment = await this.paymentRepository.findByOrder(orderId);
            
            return payment;
        } catch (error) {
            return {error: error.message};
        }
    }

}
