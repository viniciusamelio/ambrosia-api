import {Request} from 'express';
import { ProductRepository } from '../../repositories/ProductRepository';

class FindProductByCategoryAction{
    constructor(private productRepository: ProductRepository){}

    async index(request:Request) : Promise<any>{
        try {
            const { category_id } = request.params;

            const products = await this.productRepository.findByCategory(category_id);                        

            return products;
            
        } catch (error) {
            return {error: error.message};
        }
    }

}

export {FindProductByCategoryAction}