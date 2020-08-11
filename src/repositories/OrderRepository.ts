import { createConnection, getConnectionManager } from "typeorm";
import { Order } from "../entity/Order";

export class OrderRepository{
    async save(order : Order){
        try {
            return createConnection().then(async (connection) => {
                const orderRepository = connection.getRepository(Order);
                await orderRepository.save(order);
                const savedOrder = await orderRepository.findOne({ id: order.id });
                connection.close();
                return savedOrder;
            }).catch((error) => {
                getConnectionManager().get().close();
                return error;
            });
        } catch (error) {
            return error;
        }
    }

    async find(orderId: string){
        try {
            return createConnection().then(async (connection) => {
                const orderRepository = connection.getRepository(Order);
                const order = orderRepository.findOne({id: orderId});
                connection.close();
                return order;
            }).catch((error) => {
                getConnectionManager().get().close();
                return error;
            });
        } catch (error) {
            return error;
        }
    }

    async findByUser(userId: string){
        try {
            return createConnection().then(async (connection) => {
                const orderRepository = connection.getRepository(Order);
                const order = orderRepository.find({user: {id : userId}});
                connection.close();
                return order;
            }).catch((error) => {
                getConnectionManager().get().close();
                return error;
            });
        } catch (error) {
            return error;
        }
    }

    async list(){
        try {
            return createConnection().then(async (connection) => {
                const orderRepository = connection.getRepository(Order);
                const order = orderRepository.find();
                connection.close();
                return order;
            }).catch((error) => {
                getConnectionManager().get().close();
                return error;
            });
        } catch (error) {
            return error;
        }
    }

    async delete(orderId: string){
        try {
            return createConnection().then(async (connection) => {
                const orderRepository = connection.getRepository(Order);
                await orderRepository.delete({id: orderId});
                connection.close();
                return {message: "Pedido removido com sucesso"};
            }).catch((error) => {
                getConnectionManager().get().close();
                return error;
            });
        } catch (error) {
            return error;
        }
    }
}