import { Request, Response, response } from "express";
import { getProductImagePath } from "../utils/getProductImagePath";
import { PaymentMethodRepository } from "../repositories/PaymentMethodRepository";
import { CreatePaymentMethodAction } from "../useCases/paymentMethodUseCases/createPaymentMethodAction";
import { UpdatePaymentMethodAction } from "../useCases/paymentMethodUseCases/updatePaymentMethodAction";
import { DeletePaymentMethodAction } from "../useCases/paymentMethodUseCases/deletePaymentMethodAction";
import { ListPaymentMethodAction } from "../useCases/paymentMethodUseCases/listPaymentMethodAction";
import { FindPaymentMethodAction } from "../useCases/paymentMethodUseCases/findPaymentMethodAction";

const paymentMethodRepository = new PaymentMethodRepository();

const createPaymentMethodAction = new CreatePaymentMethodAction(paymentMethodRepository);
const updatePaymentMethodAction = new UpdatePaymentMethodAction(paymentMethodRepository);
const deletePaymentMethodAction = new DeletePaymentMethodAction(paymentMethodRepository);
const listPaymentMethodAction = new ListPaymentMethodAction(paymentMethodRepository);
const findPaymentMethodAction = new FindPaymentMethodAction(paymentMethodRepository);

class PaymentMethodController {
    async create(req: Request, res: Response) {
        const result = await createPaymentMethodAction.index(req);
        if (result.error) return res.status(400).json({ error: result.error }).send();
        return res.status(201).json(result).send();
    }

    async find(req: Request, res: Response) {
        const result = await findPaymentMethodAction.index(req);
        if (result.error) return res.status(400).json({ error: result.error }).send();
        return res.status(200).json(result).send();
    }


    async list(req: Request, res: Response) {
        const result = await listPaymentMethodAction.index();
        if (result.error) return res.status(400).json({ error: result.error }).send();
        return res.status(200).json(result).send();
    }


    async update(req: Request, res: Response) {
        const result = await updatePaymentMethodAction.index(req);
        if (result.error) return res.status(400).json({ error: result.error }).send();
        result.image = getProductImagePath(req, result.image);
        return res.status(200).json(result).send();
    }


    async delete(req: Request, res: Response) {
        const result = await deletePaymentMethodAction.index(req);
        if (result.error) return res.status(400).json({ error: result.error }).send();
        return res.status(200).json(result).send();
    }

}

export { PaymentMethodController }