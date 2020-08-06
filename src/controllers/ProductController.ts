import { ProductRepository } from "../repositories/ProductRepository";
import { Request, Response, response } from "express";
import { CreateProductAction } from "../useCases/productUseCases/createProductAction";
import { CategoryRepository } from "../repositories/CategoryRepository";

const productRepository = new ProductRepository();
const categoryRepository = new CategoryRepository();

const createProductAction = new CreateProductAction(productRepository,categoryRepository);



class ProductController{
    async create(req:Request, res:Response){
        const result = await createProductAction.index(req);
        if (result.error) return res.status(400).json({ error: result.error }).send();
        return res.status(201).json(result).send();
    }
}

export {ProductController}