import * as express  from 'express';
import { UserController } from '../controllers/UserController';

const userController = new UserController();
const UserRouter = express();


UserRouter.post('/user',userController.create);

export {UserRouter};