import {Request} from 'express';
import { PaymentRepository } from '../../repositories/PaymentRepository';



export class FindByUserPaymentAction{
    constructor(private paymentRepository: PaymentRepository){}

    async index(request: Request){
        try {

            const {userId} = request.params;

            const paymentList = await this.paymentRepository.findByUser(userId);
            
            return paymentList;
        } catch (error) {
            return {error: error.message};
        }
    }

}
