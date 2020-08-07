import * as express  from 'express';
import { ProductController } from '../controllers/ProductController';
import * as multer from 'multer';
import { multerImageConfig } from '../config/multer';

const productController = new ProductController();


const ProductRouter = express.Router();

ProductRouter.get('/products',productController.list);
ProductRouter.get('/products/:category_id',productController.findByCategory);
ProductRouter.get('/product/:id',productController.find);
ProductRouter.post('/product',multer(multerImageConfig).single('file'),productController.create);
ProductRouter.patch('/product/image',multer(multerImageConfig).single('file'),productController.changePicture);
ProductRouter.put('/product', productController.update);
ProductRouter.delete('/product/:id', productController.delete);

export {ProductRouter};