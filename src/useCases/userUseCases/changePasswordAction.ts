import { UserRepository } from "../../repositories/UserRepository"
import {Request} from 'express';
const bcrypt = require('bcrypt');
class ChangeUserPasswordAction{
    constructor(private userRepository: UserRepository){}
    
    async index(req:Request):Promise<any>{
        try {
            const {email, password} = req.body;
            const user = await this.userRepository.findByEmail(email);            
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