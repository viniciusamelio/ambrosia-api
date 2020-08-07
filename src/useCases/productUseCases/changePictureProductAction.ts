import {Request} from 'express';
import { ProductRepository } from '../../repositories/ProductRepository';
import { isNullOrUndefined } from 'util';
import { resolve, sep } from 'path';
import * as fs from 'fs';

class ChangePictureProductAction{
    constructor(private productRepository: ProductRepository){}

    async index(request:Request){
        try {
            const { id } = request.body;
            const product = await this.productRepository.find(id);
            if(isNullOrUndefined(product)) return {error:"Produto não encontrado"}
            
            const imagePath = resolve(__dirname, '..', '..', '..', 'public', 'uploads', 'products') + sep + product.image;
            // Deletando a imagem do produto
            fs.unlinkSync(imagePath);

            product.image = request.file.filename;
            const result = await this.productRepository.save(product);
            return result;
        } catch (error) {
            return {error: error.message};
        }
    }

}

export {ChangePictureProductAction}