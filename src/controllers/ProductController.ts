import { ProductRepository } from "../repositories/ProductRepository";
import { Request, Response, response } from "express";
import { CreateProductAction } from "../useCases/productUseCases/createProductAction";
import { CategoryRepository } from "../repositories/CategoryRepository";
import { UpdateProductAction } from "../useCases/productUseCases/updateProductAction";
import { ChangePictureProductAction } from "../useCases/productUseCases/changePictureProductAction";
import { DeleteProductAction } from "../useCases/productUseCases/deleteProductAction";
import { ListProductAction } from "../useCases/productUseCases/listProductAction";
import { FindProductAction } from "../useCases/productUseCases/findProductAction";
import { FindProductByCategoryAction } from "../useCases/productUseCases/findProductByCategoryAction";
import { getProductImagePath } from "../utils/getProductImagePath";

const productRepository = new ProductRepository();
const categoryRepository = new CategoryRepository();

const createProductAction = new CreateProductAction(productRepository, categoryRepository);
const updateProductAction = new UpdateProductAction(productRepository, categoryRepository);
const changePicutreProductAction = new ChangePictureProductAction(productRepository);
const deleteProductAction = new DeleteProductAction(productRepository);
const listProductAction = new ListProductAction(productRepository);
const findProductAction = new FindProductAction(productRepository);
const findProductByCategoryAction = new FindProductByCategoryAction(productRepository);

class ProductController {
    async create(req: Request, res: Response) {
        const result = await createProductAction.index(req);
        if (result.error) return res.status(400).json({ error: result.error }).send();
        result.image = getProductImagePath(req,result.image);
        return res.status(201).json(result).send();
    }

    async find(req: Request, res: Response) {
        const result = await findProductAction.index(req);
        if (result.error) return res.status(400).json({ error: result.error }).send();
        result.image = getProductImagePath(req,result.image);
        return res.status(200).json(result).send();
    }

    async findByCategory(req: Request, res: Response) {
        const result = await findProductByCategoryAction.index(req);
        if (result.error) return res.status(400).json({ error: result.error }).send();
        result.image = getProductImagePath(req,result.image);
        return res.status(200).json(result).send();
    }

    async list(req: Request, res: Response) {
        const result = await listProductAction.index();
        if (result.error) return res.status(400).json({ error: result.error }).send();
        result.image = getProductImagePath(req,result.image);
        return res.status(200).json(result).send();
    }


    async update(req: Request, res: Response) {
        const result = await updateProductAction.index(req);
        if (result.error) return res.status(400).json({ error: result.error }).send();
        result.image = getProductImagePath(req,result.image);
        return res.status(200).json(result).send();
    }

    async changePicture(req: Request, res: Response) {
        const result = await changePicutreProductAction.index(req);
        if (result.error) return res.status(400).json({ error: result.error }).send();
        result.image = getProductImagePath(req,result.image);
        return res.status(200).json(result).send();
    }

    async delete(req: Request, res: Response) {
        const result = await deleteProductAction.index(req);
        if (result.error) return res.status(400).json({ error: result.error }).send();
        return res.status(200).json(result).send();
    }

}

export { ProductController }