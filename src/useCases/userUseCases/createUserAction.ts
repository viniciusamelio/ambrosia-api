import { UserRepository } from "../../repositories/UserRepository"
import {Request} from 'express';
import { User } from "../../entity/User";
const bcrypt = require('bcrypt');
import { v4 as uuid } from 'uuid';
import { MailService } from "../../services/MailService";
class CreateUserAction{
    constructor(private userRepository: UserRepository, private mailService: MailService){}
    
    async index(req:Request):Promise<any>{
        try {
            const {name, email, birthdate, password} = req.body;
            const user = new User();
            user.name = name;
            user.email = email;
            user.birthdate = new Date(birthdate);
            user.role = "user";
            await bcrypt.hash(password,10,(error,result)=>{
                if(error) throw error;
                user.password = result;
            });
            user.id = uuid();
            const result = await this.userRepository.save(user);
            this.mailService.sendWelcomeEmail(result.email,result.name);
            return result;
        } catch (error) {
            return {error:error.message};
        }
    }
}

export {CreateUserAction}