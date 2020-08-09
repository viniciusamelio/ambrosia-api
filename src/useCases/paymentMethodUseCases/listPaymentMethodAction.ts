import { PaymentMethodRepository } from '../../repositories/PaymentMethodRepository';


class ListPaymentMethodAction {
    constructor(private paymentMethodRepository: PaymentMethodRepository) { }

    async index() {
        try {
            const result = await this.paymentMethodRepository.findAll();
            return result;
        } catch (error) {
            return { error: error.message };
        }
    }

}

export { ListPaymentMethodAction }