import { UserRepository } from "../../repositories/UserRepository"
import {Request} from 'express';
import { isNullOrUndefined } from "util";
import { User } from "../../entity/User";
class UpdateUserAction{
    constructor(private userRepository: UserRepository){}
    
    async index(req:Request): Promise<any>{
        try {
            const {name, email, birthdate, role = "user"} = req.body;
            const queryUser = new User();
            queryUser.email = email;
            const user = await this.userRepository.findByEmail(queryUser);

            if(isNullOrUndefined(user)) return {error:"Usuário não cadastrado"}
            
            user.name = name;
            user.email = email;
            user.birthdate = new Date(birthdate);
            user.role = role;
            const result = await this.userRepository.save(user);
            return result;
        } catch (error) {
            return {error:error.message};
        }
    }
}

export {UpdateUserAction}