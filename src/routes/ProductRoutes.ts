import * as express  from 'express';
import { ProductController } from '../controllers/ProductController';
import * as multer from 'multer';
import { multerImageConfig } from '../config/multer';

const productController = new ProductController();


const ProductRouter = express.Router();

ProductRouter.post('/product',multer(multerImageConfig).single('file'),productController.create);

export {ProductRouter};