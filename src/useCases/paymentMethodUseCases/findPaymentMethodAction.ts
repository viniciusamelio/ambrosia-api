import { Request } from 'express';
import { PaymentMethodRepository } from '../../repositories/PaymentMethodRepository';


class FindPaymentMethodAction {
    constructor(private paymentMethodRepository: PaymentMethodRepository) { }

    async index(request: Request) {
        try {
            const { id } = request.params;
            const result = await this.paymentMethodRepository.find(id);
            return result;
        } catch (error) {
            return { error: error.message };
        }
    }

}

export { FindPaymentMethodAction }