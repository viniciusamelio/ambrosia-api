import {Request} from 'express';
import { OrderRepository } from '../../repositories/OrderRepository';
import { Order } from '../../entity/Order';
import { UserRepository } from '../../repositories/UserRepository';


export class FindOrderAction{
    constructor(private orderRepository: OrderRepository){}

    async index(request:Request) : Promise<any>{
        try {
            const { userId } = request.params;
            const { orderId } = request.query;

            let orderList : Order[];

            if(orderId){
                const order  = await this.orderRepository.find(userId);
                orderList.push(order);
            }else{
                const orders = await this.orderRepository.findByUser(userId);
                orderList.push(orders);
            }                    
            return orderList;
        } catch (error) {
            return {error: error.message};
        }
    }

}
