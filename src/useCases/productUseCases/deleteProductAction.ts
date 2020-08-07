import { Request } from 'express';
import { ProductRepository } from '../../repositories/ProductRepository';
import { resolve, sep } from 'path';
import * as fs from 'fs';
import { Product } from '../../entity/Product';

class DeleteProductAction {
    constructor(private productRepository: ProductRepository) { }

    async index(request: Request) {
        try {
            const { id } = request.params;
            const product: Product = await this.productRepository.find(id);
            const imagePath = resolve(__dirname, '..', '..', '..', 'public', 'uploads', 'products') + sep + product.image;
            // Deletando a imagem do produto
            fs.unlinkSync(imagePath);
            await this.productRepository.delete(id);
            return { message: "Produto removido com sucesso" }
        } catch (error) {
            return { error: error.message };
        }
    }

}

export { DeleteProductAction }