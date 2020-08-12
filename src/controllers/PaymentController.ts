import { Request, Response } from "express";
import { CreatePaymentAction } from "../useCases/paymentUseCases/createPaymentAction";
import { PaymentRepository } from "../repositories/PaymentRepository";
import { PaymentMethodRepository } from "../repositories/PaymentMethodRepository";
import { OrderRepository } from "../repositories/OrderRepository";
import { UpdatePaymentAction } from "../useCases/paymentUseCases/updatePaymentAction";
import { ListPaymentAction } from "../useCases/paymentUseCases/listPaymentAction";
import { FindPaymentAction } from "../useCases/paymentUseCases/findPaymentAction";
import { FindByUserPaymentAction } from "../useCases/paymentUseCases/findByUserPaymentAction";
import { FindByOrderPaymentAction } from "../useCases/paymentUseCases/findByOrderPaymentAction";
import { DeletePaymentAction } from "../useCases/paymentUseCases/deletePaymentAction";
import { PicPayService } from "../services/PicPayService";
import { ReceivePicPayNotification } from "../useCases/paymentUseCases/receivePicPayNotification";

const paymentRepository = new PaymentRepository();
const paymentMethodRepository = new PaymentMethodRepository();
const orderRepository = new OrderRepository();


const createPaymentAction = new CreatePaymentAction(paymentRepository,orderRepository,paymentMethodRepository);
const updatePaymentAction = new UpdatePaymentAction(paymentRepository,orderRepository,paymentMethodRepository);
const listPaymentAction = new ListPaymentAction(paymentRepository);
const findPaymentAction = new FindPaymentAction(paymentRepository);
const findByUserPaymentAction = new FindByUserPaymentAction(paymentRepository);
const findByOrderPaymentAction = new FindByOrderPaymentAction(paymentRepository);
const deletePaymentAction = new DeletePaymentAction(paymentRepository);

const receivePicPayNotification = new ReceivePicPayNotification();

export class PaymentController{
    async create(req:Request, res: Response){
        const result = await createPaymentAction.index(req);
        if (result.error) return res.status(400).json({ error: result.error }).send();
        return res.status(201).json(result).send();
    }

    async update(req:Request, res: Response){
        const result = await updatePaymentAction.index(req);
        if (result.error) return res.status(400).json({ error: result.error }).send();
        return res.status(200).json(result).send();
    }

    async list(req:Request, res: Response){
        const result = await listPaymentAction.index();
        if (result.error) return res.status(400).json({ error: result.error }).send();
        return res.status(200).json(result).send();
    }

    async find(req:Request, res: Response){
        const result = await findPaymentAction.index(req);
        if (result.error) return res.status(400).json({ error: result.error }).send();
        return res.status(200).json(result).send();
    }

    async findByUser(req:Request, res: Response){
        const result = await findByUserPaymentAction.index(req);
        if (result.error) return res.status(400).json({ error: result.error }).send();
        return res.status(200).json(result).send();
    }

    async findByOrder(req:Request, res: Response){
        const result = await findByOrderPaymentAction.index(req);
        if (result.error) return res.status(400).json({ error: result.error }).send();
        return res.status(200).json(result).send();
    }

    async delete(req:Request, res: Response){
        const result = await deletePaymentAction.index(req);
        if (result.error) return res.status(400).json({ error: result.error }).send();
        return res.status(200).json(result).send();
    }

    async receiveNotification(req:Request, res:Response){
        await receivePicPayNotification.index(req);
        return res.send();
    }
}