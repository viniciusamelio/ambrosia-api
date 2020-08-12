import {Request} from 'express';
import { PaymentMethodRepository } from '../../repositories/PaymentMethodRepository';
import { Payment } from '../../entity/Payment';
import { PaymentRepository } from '../../repositories/PaymentRepository';
import { OrderRepository } from '../../repositories/OrderRepository';
import { isNullOrUndefined } from 'util';


export class UpdatePaymentAction{
    constructor(private paymentRepository: PaymentRepository, private orderRepository: OrderRepository, private paymentMethodRepository: PaymentMethodRepository){}

    async index(request:Request){
        try {
            const { paymentMethodId, orderId, amount, id, status } = request.body;

            const order = await this.orderRepository.find(orderId);

            if(isNullOrUndefined(order)) return {error:"Pedido não encontrado"}

            const paymentMethod = await this.paymentMethodRepository.find(paymentMethodId);

            if(isNullOrUndefined(paymentMethod)) return {error: "Método de pagamento não encontrado"}

            const payment = new Payment();                        
            payment.id = id;
            payment.order = order;
            payment.paymentMethod = paymentMethod;
            payment.amount = parseFloat(amount);
            payment.status = status;

            const result = await this.paymentRepository.save(payment);
            
            return result;
        } catch (error) {
            return {error: error.message};
        }
    }

}
