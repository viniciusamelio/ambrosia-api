import * as express  from 'express';
import { UserController } from '../controllers/UserController';

const userController = new UserController();
const UserRouter = express.Router();


UserRouter.post('/user',userController.create);
UserRouter.post('/user/address',userController.createAddress);

UserRouter.put('/user', userController.update);
UserRouter.put('/user/address', userController.updateAddress);

UserRouter.patch('/user/password', userController.changePassword);

export {UserRouter};