import {Request} from 'express';
import { CategoryRepository } from '../../repositories/CategoryRepository';
import { ProductCategory } from '../../entity/ProductCategory';
import { isNullOrUndefined } from 'util';

class UpdateCategoryAction{
    constructor(private categoryRepository: CategoryRepository){}

    async index(request:Request){
        try {
            const {id,name,description} = request.body;
                        
            const foundCategory = await this.categoryRepository.find(id);
            if(! isNullOrUndefined(foundCategory)) return {error: "Categoria não encontrada"}

            const category = new ProductCategory();
            category.name = name;
            category.description = description;
            category.id = id;

            const result = await this.categoryRepository.save(category);
            return result;
        } catch (error) {
            return {error: error.message};
        }
    }

}

export {UpdateCategoryAction}