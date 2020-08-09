import { Request } from 'express';
import { PaymentMethodRepository } from '../../repositories/PaymentMethodRepository';


class DeletePaymentMethodAction {
    constructor(private paymentMethodRepository: PaymentMethodRepository) { }

    async index(request: Request) {
        try {
            const { id } = request.body;
            await this.paymentMethodRepository.delete(id);
            return { message: "Método de pagamento deletado com sucesso" };
        } catch (error) {
            return { error: error.message };
        }
    }

}

export { DeletePaymentMethodAction }