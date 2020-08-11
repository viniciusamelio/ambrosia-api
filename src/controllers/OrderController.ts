import { Request, Response } from 'express';
import { OrderRepository } from '../repositories/OrderRepository';
import { CreateOrderAction } from '../useCases/orderUseCases/createOrderAction';
import { UserRepository } from '../repositories/UserRepository';
import { UpdateOrderAction } from '../useCases/orderUseCases/updateOrderAction';
import { FindOrderAction } from '../useCases/orderUseCases/findOrderAction';
import { ListOrderAction } from '../useCases/orderUseCases/listOrderAction';

const orderRepository = new OrderRepository();
const userRepository = new UserRepository();

const createOrderAction = new CreateOrderAction(orderRepository,userRepository);
const updateOrderAction = new UpdateOrderAction(orderRepository,userRepository);
const findOrderAction = new FindOrderAction(orderRepository);
const listOrderAction = new ListOrderAction(orderRepository);


export class OrderController{

    async create(req: Request, res: Response) {
        const result = await createOrderAction.index(req);
        if (result.error) return res.status(400).json({ error: result.error }).send();
        return res.status(201).json(result).send();
    }

    async update(req: Request, res: Response) {
        const result = await updateOrderAction.index(req);
        if (result.error) return res.status(400).json({ error: result.error }).send();
        return res.status(200).json(result).send();
    }
    async find(req: Request, res: Response) {
        const result = await findOrderAction.index(req);
        if (result.error) return res.status(400).json({ error: result.error }).send();
        return res.status(200).json(result).send();
    }

    async list(req: Request, res: Response) {
        const result = await listOrderAction.index();
        if (result.error) return res.status(400).json({ error: result.error }).send();
        return res.status(200).json(result).send();
    }

}