import {Request} from 'express';
import { ProductRepository } from '../../repositories/ProductRepository';

class FindProductAction{
    constructor(private productRepository: ProductRepository){}

    async index(request:Request) : Promise<any>{
        try {
            const { id } = request.params;

            const product = await this.productRepository.find(id);                        

            return product;
            
        } catch (error) {
            return {error: error.message};
        }
    }

}

export {FindProductAction}