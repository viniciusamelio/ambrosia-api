import {Request,Response} from 'express';
import { CreateUserAction } from '../useCases/userUseCases/createUserAction';
import { UserRepository } from '../repositories/UserRepository';
const createUserAction = new CreateUserAction();
createUserAction.userRepository = new UserRepository();
class UserController{
    async create(req:Request,res:Response){
        const result = await createUserAction.create(req);
        if(result.error){
            return res.status(400).json({error: result.error}).send();
        }
        return res.json(result);
    }

}

export {UserController}