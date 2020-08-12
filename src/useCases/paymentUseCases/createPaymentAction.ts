import { Request } from 'express';
import { v4 as uuid } from 'uuid';
import { PaymentMethodRepository } from '../../repositories/PaymentMethodRepository';
import { Payment } from '../../entity/Payment';
import { PaymentRepository } from '../../repositories/PaymentRepository';
import { OrderRepository } from '../../repositories/OrderRepository';
import { isNullOrUndefined } from 'util';
import { PicPayService, PicPayPayment, PicPayBuyer } from '../../services/PicPayService';


export class CreatePaymentAction {

    picpayService: PicPayService;


    constructor(private paymentRepository: PaymentRepository, private orderRepository: OrderRepository, private paymentMethodRepository: PaymentMethodRepository) {
        this.picpayService = new PicPayService();
    }

    async index(request: Request) {
        try {
            const { paymentMethodId, orderId, amount, cpf, phone, email } = request.body;

            const order = await this.orderRepository.find(orderId);

            if (isNullOrUndefined(order)) return { error: "Pedido não encontrado" }

            const paymentMethod = await this.paymentMethodRepository.find(paymentMethodId);

            if (isNullOrUndefined(paymentMethod)) return { error: "Método de pagamento não encontrado" }

            const payment = new Payment();
            payment.id = uuid();
            payment.order = order;
            payment.paymentMethod = paymentMethod;
            payment.amount = parseFloat(amount);
            payment.status = "PENDENTE";
            
            let result = await this.paymentRepository.save(payment);

            if (result.paymentMethod.title.toLowerCase() == "picpay") {

                const now = new Date();
                var expireDate = new Date();
                expireDate = new Date(expireDate.setHours(now.getHours()+3));


                const order = await this.orderRepository.find(orderId);

                const name = order.user.name.split(' ');

                const paymentBuyer: PicPayBuyer = { firstName: name[0],
                    lastName: name[name.length-1],
                    document: cpf,
                    phone: phone,
                    email: email ?? order.user.email };

                const paymentDto: PicPayPayment = { referenceId: result.order.id,
                    callbackUrl: 'http://760a19130f06.ngrok.io/payment/callback',
                    expiresAt: expireDate,
                    value: parseFloat(amount),
                    buyer: paymentBuyer };

                const paymentResult = await this.picpayService.createPayment(paymentDto);

                if(paymentResult.message){
                    console.log(paymentResult);
                    return {error: "Erro ao criar pagamento com PicPay"}
                }

                payment.paymentUrl = paymentResult.paymentUrl;
                payment.expiresAt = paymentResult.expiresAt;

                result = await this.paymentRepository.save(payment);
            }

            

            return result;
        } catch (error) {
            return { error: error.message };
        }
    }

}
