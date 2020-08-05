import { UserRepository } from "../../repositories/UserRepository"
import {Request} from 'express';
import { User } from "../../entity/User";
const bcrypt = require('bcrypt');
class ChangeUserPasswordAction{
    constructor(private userRepository: UserRepository){}
    
    async index(req:Request):Promise<any>{
        try {
            const {email, password} = req.body;
            const queryUser = new User();
            queryUser.email = email;
            const user = await this.userRepository.findByEmail(queryUser);            
            await bcrypt.hash(password,10,(error,result)=>{
                if(error) throw error;
                user.password = result;
            });
            const result = await this.userRepository.save(user);
            return result;
        } catch (error) {
            return {error:error.message};
        }
    }
}

export {ChangeUserPasswordAction}