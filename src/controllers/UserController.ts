import {Request,Response} from 'express';
import { CreateUserAction } from '../useCases/userUseCases/createUserAction';
import { UserRepository } from '../repositories/UserRepository';
import { CreateAddressAction } from '../useCases/userUseCases/createAddressAction';

const userRepository = new UserRepository();

const createUserAction = new CreateUserAction();
const createAddressAction = new CreateAddressAction(userRepository);
createUserAction.userRepository = userRepository;

class UserController{
    async create(req:Request,res:Response){
        const result = await createUserAction.create(req);
        if(result.errno){
            return res.status(400).json({error: result.name}).send();
        }
        return res.status(201).json(result);
    }

    async createAddress(req:Request,res:Response){
        const result = await createAddressAction.create(req);
        if(result.errno){
            return res.status(400).json({error: result.name}).send();
        }

        return res.status(201).json(result);
    }

}

export {UserController}