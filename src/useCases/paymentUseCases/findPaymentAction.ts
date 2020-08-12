import {Request} from 'express';
import { PaymentRepository } from '../../repositories/PaymentRepository';



export class FindPaymentAction{
    constructor(private paymentRepository: PaymentRepository){}

    async index(request:Request){
        try {
            const { id } = request.params;

            const payment = await this.paymentRepository.find(id);

            return payment;
        } catch (error) {
            return {error: error.message};
        }
    }

}
