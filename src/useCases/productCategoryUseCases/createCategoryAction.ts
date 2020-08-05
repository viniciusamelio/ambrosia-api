import {Request} from 'express';
import { CategoryRepository } from '../../repositories/CategoryRepository';
import { ProductCategory } from '../../entity/ProductCategory';
import { v4 as uuid } from 'uuid';


class CreateCategoryAction{
    constructor(private categoryRepository: CategoryRepository){}

    async index(request:Request){
        try {
            const { name, description} = request.body;
            const category = new ProductCategory();
            category.name = name;
            category.description = description;
            category.id = uuid();
            const result = await this.categoryRepository.save(category);
            return result;
        } catch (error) {
            return {error: error.message};
        }
    }

}

export {CreateCategoryAction}