import {Request} from 'express';
import { v4 as uuid } from 'uuid';
import { ProductRepository } from '../../repositories/ProductRepository';
import { Product } from '../../entity/Product';
import { CategoryRepository } from '../../repositories/CategoryRepository';
import { ProductCategory } from '../../entity/ProductCategory';


class CreateProductAction{
    constructor(private productRepository: ProductRepository, private categoryRepository: CategoryRepository){}

    async index(request:Request){
        try {
            const { name, description, is_available, price, category_id} = request.body;
            const product = new Product();
            product.id = uuid();
            product.name = name;
            product.description = description;
            product.isAvailable = is_available;
            product.price =  parseFloat(price);
            product.image = request.file.filename;
            const category = await this.categoryRepository.find(category_id);
            if(category.error) return {error: category.error}
            product.category = category;
            const result = await this.productRepository.save(product);
            return result;
        } catch (error) {
            return {error: error.message};
        }
    }

}

export {CreateProductAction}