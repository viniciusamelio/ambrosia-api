import { Request, Response } from 'express';
import { CreateCategoryAction } from '../useCases/productCategoryUseCases/createCategoryAction';
import { CategoryRepository } from '../repositories/CategoryRepository';
import { UpdateCategoryAction } from '../useCases/productCategoryUseCases/updateCategoryAction';
import { FindCategoryAction } from '../useCases/productCategoryUseCases/findCategoryActions';
import { DeleteCategoryAction } from '../useCases/productCategoryUseCases/deleteCategoryAction';

const categoryRepository = new CategoryRepository();

const createCategoryAction = new CreateCategoryAction(categoryRepository);
const updateCategoryAction = new UpdateCategoryAction(categoryRepository);
const findCategoryAction = new FindCategoryAction(categoryRepository);
const deleteCategoryAction = new DeleteCategoryAction(categoryRepository);

class CategoryController {
    async create(req: Request, res: Response) {
        const result = await createCategoryAction.index(req);
        if (result.error) return res.status(400).json({ error: result.error }).send();
        return res.status(201).json(result).send();
    }

    async find(req: Request, res: Response) {
        const result = await findCategoryAction.index(req);
        if (result.error) return res.status(400).json({ error: result.error }).send();
        return res.status(200).json(result).send();
    }

    async update(req: Request, res: Response) {
        const result = await updateCategoryAction.index(req);
        if (result.error) return res.status(400).json({ error: result.error }).send();
        return res.status(200).json(result).send();
    }

    async delete(req: Request, res: Response) {
        const result = await deleteCategoryAction.index(req);
        if (result.error) return res.status(400).json({ error: result.error }).send();
        return res.status(200).json(result).send();
    }
}

export { CategoryController }