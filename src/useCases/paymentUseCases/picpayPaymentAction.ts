import { Payment } from "../../entity/Payment";
import { Request } from "express";
import { PicPayBuyer, PicPayPayment } from "../../services/PicPayService";
import { getHostname } from "../../utils/getHostname";


export async function picpayPaymentAction(orderId: string, payment: Payment, request: Request) {
    try {
        const { cpf, phone, email } = request.body;
        const now = new Date();
        var expireDate = new Date();
        expireDate = new Date(expireDate.setHours(now.getHours() + 3));


        const order = await this.orderRepository.find(orderId);

        const name = order.user.name.split(' ');

        const paymentBuyer: PicPayBuyer = {
            firstName: name[0],
            lastName: name[name.length - 1],
            document: cpf,
            phone: phone,
            email: email ?? order.user.email
        };

        const paymentDto: PicPayPayment = {
            referenceId: payment.order.id,
            callbackUrl: `${getHostname(request)}/payment/callback`,
            expiresAt: expireDate,
            value: payment.amount,
            buyer: paymentBuyer
        };

        const paymentResult = await this.picpayService.createPayment(paymentDto);

        if (paymentResult.message) {
            return { error: "Erro ao criar pagamento com PicPay" }
        }

        payment.paymentUrl = paymentResult.paymentUrl;
        payment.expiresAt = paymentResult.expiresAt;

        const result = await this.paymentRepository.save(payment);
        return result;
    } catch (error) {
        return error;
    }
}