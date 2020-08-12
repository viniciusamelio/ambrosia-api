import { createConnection, getConnectionManager } from "typeorm";
import { Payment } from "../entity/Payment";


export class PaymentRepository {

    async save(payment: Payment) {
        try {
            return createConnection().then(async (connection) => {
                const paymentRepository = connection.getRepository(Payment);
                await paymentRepository.save(payment);
                const savedPayment = await paymentRepository.findOne({relations: ['paymentMethod','order'], where: { id: payment.id }});
                connection.close();
                return savedPayment;
            }).catch((error) => {
                getConnectionManager().get().close();
                return error;
            });
        } catch (error) {
            return error;
        }
    }

    async find(paymentId: string) {
        try {
            return createConnection().then(async (connection) => {
                const paymentRepository = connection.getRepository(Payment);
                const payment = await paymentRepository.findOne({ id: paymentId });
                connection.close();
                return payment;
            }).catch((error) => {
                getConnectionManager().get().close();
                return error;
            });
        } catch (error) {
            return error;
        }
    }

    async findByOrder(orderId: string) {
        try {
            return createConnection().then(async (connection) => {
                const paymentRepository = connection.getRepository(Payment);
                const payment = await paymentRepository.findOne({ order: {id:orderId} });
                connection.close();
                return payment;
            }).catch((error) => {
                getConnectionManager().get().close();
                return error;
            });
        } catch (error) {
            return error;
        }
    }

    async findByUser(userId: string) {
        try {
            return createConnection().then(async (connection) => {
                const paymentRepository = connection.getRepository(Payment);
                const paymentList = await paymentRepository.find({ order: { user: { id: userId } } });
                connection.close();
                return paymentList;
            }).catch((error) => {
                getConnectionManager().get().close();
                return error;
            });
        } catch (error) {
            return error;
        }
    }

    async findByReferenceId(referenceId: string) {
        try {
            return createConnection().then(async (connection) => {
                const paymentRepository = connection.getRepository(Payment);
                const payment = await paymentRepository.findOne({relations:['order'], where:{order:{id:referenceId}} });
                connection.close();
                return payment;
            }).catch((error) => {
                getConnectionManager().get().close();
                return error;
            });
        } catch (error) {
            return error;
        }
    }

    async list() {
        try {
            return createConnection().then(async (connection) => {
                const paymentRepository = connection.getRepository(Payment);
                const paymentList = await paymentRepository.find();
                connection.close();
                return paymentList;
            }).catch((error) => {
                getConnectionManager().get().close();
                return error;
            });
        } catch (error) {
            return error;
        }
    }

    async delete(paymentId:string) {
        try {
            return createConnection().then(async (connection) => {
                const paymentRepository = connection.getRepository(Payment);
                await paymentRepository.delete({id:paymentId});
                connection.close();
                return {message: "Pagamento removido com sucesso"};
            }).catch((error) => {
                getConnectionManager().get().close();
                return error;
            });
        } catch (error) {
            return error;
        }
    }

}