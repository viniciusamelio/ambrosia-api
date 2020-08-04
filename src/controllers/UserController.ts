import {Request,Response} from 'express';
import { CreateUserAction } from '../useCases/userUseCases/createUserAction';
import { UserRepository } from '../repositories/UserRepository';
import { CreateAddressAction } from '../useCases/userUseCases/createAddressAction';

const userRepository = new UserRepository();

const createUserAction = new CreateUserAction(userRepository);
const createAddressAction = new CreateAddressAction(userRepository);

class UserController{
    async create(req:Request,res:Response){
        const result = await createUserAction.index(req);
        if(result.errno){
            return res.status(400).json({error: result.name}).send();
        }
        return res.status(201).json(result);
    }

    async createAddress(req:Request,res:Response){
        const result = await createAddressAction.index(req);
        if(result.errno){
            return res.status(400).json({error: result.name}).send();
        }

        return res.status(201).json(result);
    }

}

export {UserController}