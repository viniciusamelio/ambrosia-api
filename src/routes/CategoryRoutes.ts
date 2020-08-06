import * as express  from 'express';
import { CategoryController } from '../controllers/CategoryController';

const categoryController = new CategoryController();

const CategoryRouter = express.Router();

CategoryRouter.get('/category',categoryController.find);
CategoryRouter.post('/category',categoryController.create);
CategoryRouter.put('/category', categoryController.update);
CategoryRouter.delete('/category',categoryController.delete);

export {CategoryRouter};