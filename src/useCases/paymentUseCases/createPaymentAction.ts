import {Request} from 'express';
import { v4 as uuid } from 'uuid';
import { PaymentMethodRepository } from '../../repositories/PaymentMethodRepository';
import { Payment } from '../../entity/Payment';
import { PaymentRepository } from '../../repositories/PaymentRepository';
import { OrderRepository } from '../../repositories/OrderRepository';
import { isNullOrUndefined } from 'util';


export class CreatePaymentAction{
    constructor(private paymentRepository: PaymentRepository, private orderRepository: OrderRepository, private paymentMethodRepository: PaymentMethodRepository){}

    async index(request:Request){
        try {
            const { paymentMethodId, orderId, amount } = request.body;

            const order = await this.orderRepository.find(orderId);

            if(isNullOrUndefined(order)) return {error:"Pedido não encontrado"}

            const paymentMethod = await this.paymentMethodRepository.find(paymentMethodId);

            if(isNullOrUndefined(paymentMethod)) return {error: "Método de pagamento não encontrado"}

            const payment = new Payment();                        
            payment.id = uuid();
            payment.order = order;
            payment.paymentMethod = paymentMethod;
            payment.amount = parseFloat(amount);
            payment.status = "PENDENTE";

            const result = await this.paymentRepository.save(payment);
            return result;
        } catch (error) {
            return {error: error.message};
        }
    }

}
