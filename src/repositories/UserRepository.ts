import { createConnection, getConnectionManager } from "typeorm";

import { User } from "../entity/User";

class UserRepository {
    async store(user: User) {
        try {
            return createConnection().then(async connection => {
                const userRepository = connection.getRepository(User);
                await userRepository.save(user);
                const savedUser = await userRepository.findOne({ id: user.id });
                connection.close();
                return savedUser;
            }).catch((error)=>{
                getConnectionManager().get("default").close();
                return error;
            });
        } catch (error) {            
            return error;
        }
    }

    async findByEmail(user:User){
        try {
            return createConnection().then(async connection => {
                const userRepository = connection.getRepository(User);
                const foundUser = await userRepository.findOne({ email: user.email });
                connection.close();
                return foundUser;
            });
        } catch (error) {
            getConnectionManager().get().close();
            return error;
        }
    }
}

export { UserRepository };