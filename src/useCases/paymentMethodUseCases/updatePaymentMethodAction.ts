import { Request } from 'express';
import { PaymentMethodRepository } from '../../repositories/PaymentMethodRepository';
import { PaymentMethod } from '../../entity/PaymentMethod';


class UpdatePaymentMethodAction {
    constructor(private paymentMethodRepository: PaymentMethodRepository) { }

    async index(request: Request) {
        try {
            const { title, id } = request.body;
            const paymentMethod = new PaymentMethod();
            paymentMethod.id = id;
            paymentMethod.title = title;
            const result = await this.paymentMethodRepository.save(paymentMethod);
            return result;
        } catch (error) {
            return { error: error.message };
        }
    }

}

export { UpdatePaymentMethodAction }