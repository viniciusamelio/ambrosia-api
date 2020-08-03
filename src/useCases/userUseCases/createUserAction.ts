import { UserRepository } from "../../repositories/UserRepository"
import {Request} from 'express';
import { getConnectionManager } from "typeorm";
import { User } from "../../entity/User";
const bcrypt = require('bcrypt');
import { v4 as uuid } from 'uuid';
class CreateUserAction{
    userRepository: UserRepository;
    
    async create(req:Request){
        try {
            const {name, email, birthdate, password} = req.body;
            const user = new User();
            user.name = name;
            user.email = email;
            user.birthdate = new Date(birthdate);
            await bcrypt.hash(password,10,(error,result)=>{
                if(error) throw error;
                user.password = result;
            });
            user.id = uuid();
            const result = await this.userRepository.store(user);
            return result;
        } catch (error) {
            return {error:error.message};
        }
    }
}

export {CreateUserAction}