import { Request } from 'express';
import { getDistance } from 'geolib';
import { v4 as uuid } from 'uuid';
import { OrderRepository } from '../../repositories/OrderRepository';
import { Order } from '../../entity/Order';
import { UserRepository } from '../../repositories/UserRepository';
import { isNullOrUndefined } from 'util';
import { LocationIQService } from '../../services/LocationIQService';

const locationService = new LocationIQService();

export class CreateOrderAction {
    constructor(private orderRepository: OrderRepository, private userRepository: UserRepository) { }

    async index(request: Request) {
        try {
            const { addressId, userEmail, items, amount, contactEmail } = request.body;

            const user = await this.userRepository.findByEmail(userEmail);

            if (isNullOrUndefined(user)) return { error: "Usuário não encontrado" }

            const address = await this.userRepository.findAddress(addressId, user.id);

            if (isNullOrUndefined(address)) return { error: "Endereço não encontrado" }

            const location = await locationService.getLocation(`${address.street} , ${address.number}, ${address.neighborhood}, ${address.city} - ${address.state}, Brazil ,${address.zipCode}`);

            if (!isNullOrUndefined(location)) {
                const distance = getDistance({ latitude: location.lat, longitude: location.lon }, { latitude: process.env.LATITUDE, longitude: process.env.LONGITUDE }, 1000) / 1000;
                if (distance > parseFloat(process.env.MAX_ACCEPTED_DISTANCE)) return { error: "Endereço fora do raio de cobertura de entrega" };
            }

            const order = new Order();
            order.id = uuid();
            order.user = user;
            order.address = address;
            order.items = items;
            order.status = "PENDENTE";
            order.contactEmail = contactEmail;
            order.amount = parseFloat(amount);

            const result = await this.orderRepository.save(order);

            return result;

        } catch (error) {
            return { error: error.message };
        }
    }

}
