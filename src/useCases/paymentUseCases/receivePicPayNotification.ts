import { Request } from "express";
import { PicPayService } from "../../services/PicPayService";
import { PaymentRepository } from "../../repositories/PaymentRepository";
import { Payment } from "../../entity/Payment";
import { isNullOrUndefined } from "util";
import { OrderRepository } from "../../repositories/OrderRepository";

const picpayService = new PicPayService();

const paymentRepository = new PaymentRepository();
const orderRepository = new OrderRepository();

export class ReceivePicPayNotification{

    async index(request:Request){
        const { referenceId } = request.body;

        const response = await picpayService.getStatus(referenceId);
        console.log(response);
        let status  = response.status;

        const payment : Payment = await paymentRepository.findByReferenceId(referenceId);


        if(!isNullOrUndefined(payment)){
            if(status == "paid"){
                payment.order.status = "PRODUÇÃO";
            }else if(status == "expired"){
                payment.order.status = "EXPIRADO";
            }else if(status == "refunded" || status=="chargeback"){
                payment.order.status = "CANCELADO";
            }
    
            payment.status = status;
    
            await paymentRepository.save(payment);
            await orderRepository.save(payment.order);
        }

        
        
    }

}