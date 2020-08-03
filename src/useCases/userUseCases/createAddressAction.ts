import { UserRepository } from "../../repositories/UserRepository"
import { Request } from 'express';
import { Address } from "../../entity/Address";
import { User } from "../../entity/User";
import { v4 as uuid } from 'uuid';

class CreateAddressAction {

    constructor(private userRepository: UserRepository) { }

    async create(req:Request):Promise<any>{
        try {
            const {userEmail, title, street, number, neighborhood, city, reference, zipCode, state} = req.body;
            const queryUser = new User();
            queryUser.email = userEmail;
            const user = await this.userRepository.findByEmail(queryUser);
            const address = new Address();
            address.id = uuid();
            address.city = city;            
            address.title = title;
            address.street = street;
            address.number = number;
            address.state = state;
            address.neighborhood = neighborhood;
            address.reference = reference;
            address.zipCode = zipCode;
            
            const savedUser = await this.userRepository.storeAddress(user,address);

            return savedUser;

        } catch (error) {
            return {error:error.message};
        }
    }

}

export { CreateAddressAction }