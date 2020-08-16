import { UserRepository } from "../../repositories/UserRepository"
import { Request } from 'express';
const bcrypt = require('bcrypt');
import { isNullOrUndefined } from "util";
import { User } from "../../entity/User";
class LoginUserAction {
    constructor(private userRepository: UserRepository) { }

    async index(req: Request): Promise<any> {
        try {
            const { password, email } = req.body;
            const queryUser = new User();
            queryUser.email = email;
            const user = await this.userRepository.findByEmail(queryUser.email);

            if (isNullOrUndefined(user)) return { warning: "Usuário e senha inválidos" }

            const validPassword = await bcrypt.compare(password, user.password);

            if (validPassword) {
                return { message: "Logado com sucesso", user:user }
            }

            return { warning: "Usuário e senha inválidos" }

        } catch (error) {
            return { error: error.message };
        }
    }
}

export { LoginUserAction }