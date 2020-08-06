import { Request } from 'express';
import { CategoryRepository } from '../../repositories/CategoryRepository';
import { isNullOrUndefined } from 'util';

class FindCategoryAction {
    constructor(private categoryRepository: CategoryRepository) { }

    async index(request: Request) {
        try {
            const { id } = request.query;
            if (id) {                
                const foundCategory = await this.categoryRepository.find(id.toString());
                if (isNullOrUndefined(foundCategory)) return { error: "Categoria não encontrada" }
                return foundCategory;
            }
            const categories = await this.categoryRepository.findAll();
            return categories;
        } catch (error) {
            return { error: error.message };
        }
    }

}

export { FindCategoryAction }