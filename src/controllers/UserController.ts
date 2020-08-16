import { Request, Response } from 'express';
import { CreateUserAction } from '../useCases/userUseCases/createUserAction';
import { UserRepository } from '../repositories/UserRepository';
import { CreateAddressAction } from '../useCases/userUseCases/createAddressAction';
import { UpdateUserAction } from '../useCases/userUseCases/updateUserAction';
import { UpdateUserAddressAction } from '../useCases/userUseCases/updateUserAddressAction';
import { ChangeUserPasswordAction } from '../useCases/userUseCases/changePasswordAction';
import { LoginUserAction } from '../useCases/userUseCases/loginUserAction';
import { MailService } from '../services/MailService';

const userRepository = new UserRepository();
const mailService = new MailService();


const createUserAction = new CreateUserAction(userRepository,mailService);
const createAddressAction = new CreateAddressAction(userRepository);
const updateUserAction = new UpdateUserAction(userRepository);
const updateAddressAction = new UpdateUserAddressAction(userRepository);
const changePasswordAction = new ChangeUserPasswordAction(userRepository);
const loginUserAction = new LoginUserAction(userRepository);
class UserController {
    async create(req: Request, res: Response) {
        const result = await createUserAction.index(req);
        if (result.error) {
            return res.status(400).json({ error: result.error }).send();
        }
        return res.status(201).json(result);
    }

    async update(req: Request, res: Response) {
        const result = await updateUserAction.index(req);
        if (result.error) return res.status(400).json({ error: result.error }).send();        
        return res.status(200).json(result);
    }

    async changePassword(req: Request, res: Response) {
        const result = await changePasswordAction.index(req);
        if (result.error) return res.status(400).json({ error: result.error }).send();
        return res.status(200).json(result);
    }

    async login(req:Request,res:Response){
        const result = await loginUserAction.index(req);
        if (result.error) return res.status(400).json({ error: result.error }).send();
        if (result.warning) return res.status(403).json({ error: result.warning }).send();
        return res.status(200).json(result);
    }

    async createAddress(req: Request, res: Response) {
        const result = await createAddressAction.index(req);
        if (result.error) {
            return res.status(400).json({ error: result.error }).send();
        }

        return res.status(201).json(result);
    }

    async updateAddress(req: Request, res: Response) {
        const result = await updateAddressAction.index(req);
        if (result.error) { return res.status(400).json({ error: result.error }).send(); }
        return res.status(201).json(result.addresses);
    }

}

export { UserController }