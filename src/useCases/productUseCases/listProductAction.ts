import { ProductRepository } from '../../repositories/ProductRepository';

class ListProductAction{
    constructor(private productRepository: ProductRepository){}

    async index(){
        try {
            const products = await this.productRepository.findAll();
            return products;
        } catch (error) {
            return {error: error.message};
        }
    }

}

export {ListProductAction}