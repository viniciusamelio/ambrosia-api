import {Request} from 'express';
import { PaymentRepository } from '../../repositories/PaymentRepository';



export class ListPaymentAction{
    constructor(private paymentRepository: PaymentRepository){}

    async index(){
        try {
            const paymentList = await this.paymentRepository.list();

            return paymentList;
        } catch (error) {
            return {error: error.message};
        }
    }

}
