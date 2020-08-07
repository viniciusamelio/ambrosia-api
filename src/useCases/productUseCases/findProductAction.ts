import {Request} from 'express';
import { ProductRepository } from '../../repositories/ProductRepository';
import { Product } from '../../entity/Product';

class FindProductAction{
    constructor(private productRepository: ProductRepository){}

    async index(request:Request) : Promise<any>{
        try {
            const { id } = request.params;
            const { category_id } = request.query;

            let products : Product[];

            if(category_id){
                products = await this.productRepository.find(id, category_id.toString());
                return products;
            }else{
                products = await this.productRepository.find(id);
            }

            return products;
            
        } catch (error) {
            return {error: error.message};
        }
    }

}

export {FindProductAction}