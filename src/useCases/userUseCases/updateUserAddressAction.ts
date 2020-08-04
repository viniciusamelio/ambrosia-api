import { UserRepository } from "../../repositories/UserRepository"
import { Request } from 'express';
import { Address } from "../../entity/Address";

class UpdateUserAddressAction {

    constructor(private userRepository: UserRepository) { }

    async index(req:Request):Promise<any>{
        try {
            const {userId, id , title, street, number, neighborhood, city, reference, zipCode, state} = req.body;
            const address = new Address();
            address.id = id;
            address.city = city;            
            address.title = title;
            address.street = street;
            address.number = number;
            address.state = state;
            address.neighborhood = neighborhood;
            address.reference = reference;
            address.zipCode = zipCode;
            
            const savedUser = await this.userRepository.updateAddress(userId,address);

            return savedUser;

        } catch (error) {
            return {error:error.message};
        }
    }

}

export { UpdateUserAddressAction }