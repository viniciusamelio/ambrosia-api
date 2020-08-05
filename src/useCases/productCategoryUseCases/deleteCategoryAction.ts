import { Request } from 'express';
import { CategoryRepository } from '../../repositories/CategoryRepository';
import { isNullOrUndefined } from 'util';

class DeleteCategoryAction {
    constructor(private categoryRepository: CategoryRepository) { }

    async index(request: Request) {
        try {
            const { id } = request.body;
            await this.categoryRepository.delete(id);
            return {message: "Categoria removida com sucesso"}
        } catch (error) {
            return { error: error.message };
        }
    }

}

export { DeleteCategoryAction }