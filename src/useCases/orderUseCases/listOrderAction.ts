import {Request} from 'express';
import { OrderRepository } from '../../repositories/OrderRepository';

export class ListOrderAction{
    constructor(private orderRepository: OrderRepository){}

    async index(){
        try {
            const orderList = await this.orderRepository.list();
            return orderList;

        } catch (error) {
            return {error: error.message};
        }
    }

}
