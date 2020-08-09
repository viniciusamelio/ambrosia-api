import { createConnection, getConnectionManager } from "typeorm";
import { PaymentMethod } from "../entity/PaymentMethod";

class PaymentMethodRepository {

    async save(paymentMethod: PaymentMethod) {
        try {
            return createConnection().then(async (connection) => {
                const methodRepository = connection.getRepository(PaymentMethod);
                await methodRepository.save(paymentMethod);
                const savedMethod = await methodRepository.findOne({ id: paymentMethod.id });
                connection.close();
                return savedMethod;
            }).catch((error) => {
                getConnectionManager().get().close();
                return error;
            });
        } catch (error) {
            return error;
        }
    }

    async find(paymentMethodId: string) {
        try {
            return createConnection().then(async (connection) => {
                const methodRepository = connection.getRepository(PaymentMethod);
                const savedMethod = await methodRepository.findOne({ id: paymentMethodId });
                connection.close();
                return savedMethod;
            }).catch((error) => {
                getConnectionManager().get().close();
                return error;
            });
        } catch (error) {
            return error;
        }
    }

    async delete(paymentMethodId: string) {
        try {
            return createConnection().then(async (connection) => {
                const methodRepository = connection.getRepository(PaymentMethod);
                const savedMethod = await methodRepository.delete({ id: paymentMethodId });
                connection.close();
                return savedMethod;
            }).catch((error) => {
                getConnectionManager().get().close();
                return error;
            });
        } catch (error) {
            return error;
        }
    }


    async findAll() {
        try {
            return createConnection().then(async (connection) => {
                const methodRepository = connection.getRepository(PaymentMethod);
                const method = await methodRepository.find();
                connection.close();
                return method;
            }).catch((error) => {
                getConnectionManager().get().close();
                return error;
            });
        } catch (error) {
            return error;
        }
    }

}

export { PaymentMethodRepository }