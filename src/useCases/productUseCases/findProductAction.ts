import {Request} from 'express';
import { ProductRepository } from '../../repositories/ProductRepository';
import { isNullOrUndefined } from 'util';

class FindProductAction{
    constructor(private productRepository: ProductRepository){}

    async index(request:Request) : Promise<any>{
        try {
            const { id } = request.params;

            const product = await this.productRepository.find(id);                        
            
            if(isNullOrUndefined(product)){
                return {message: "Produto não encontrado"}
            }
            
            return product;
            
        } catch (error) {
            return {error: error.message};
        }
    }

}

export {FindProductAction}