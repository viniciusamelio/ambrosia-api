import {Request} from 'express';
import { v4 as uuid } from 'uuid';
import { PaymentMethodRepository } from '../../repositories/PaymentMethodRepository';
import { PaymentMethod } from '../../entity/PaymentMethod';


class CreatePaymentMethodAction{
    constructor(private paymentMethodRepository: PaymentMethodRepository){}

    async index(request:Request){
        try {
            const { title } = request.body;
            const paymentMethod = new PaymentMethod();            
            paymentMethod.id = uuid();
            paymentMethod.title = title;
            const result = await this.paymentMethodRepository.save(paymentMethod);
            return result;
        } catch (error) {
            return {error: error.message};
        }
    }

}

export {CreatePaymentMethodAction}