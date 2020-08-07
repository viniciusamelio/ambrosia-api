import { createConnection, getConnectionManager } from "typeorm";
import { Product } from "../entity/Product";



class ProductRepository {
    async save(product: Product) {
        try {
            return createConnection().then(async (connection) => {
                const productRepository = connection.getRepository(Product);
                await productRepository.save(product);
                const savedProduct = await productRepository.findOne({ id: product.id });
                connection.close();
                return savedProduct;
            }).catch((error) => {
                getConnectionManager().get().close();
                return error;
            });
        } catch (error) {
            return error;
        }
    }

    async find(productId: string) {
        try {
            return createConnection().then(async (connection) => {
                const productRepository = connection.getRepository(Product);

                const product = await productRepository.findOne({ relations: ["category"], where: { id: productId } });

                connection.close();
                return product;
            }).catch((error) => {
                getConnectionManager().get().close();
                return error;
            });
        } catch (error) {
            return error;
        }
    }

    async findByCategory(categoryId: string) {
        try {
            return createConnection().then(async (connection) => {
                const productRepository = connection.getRepository(Product);

                const products = await productRepository.find({ relations: ["category"], where: { category: { id: categoryId } } });

                connection.close();
                return products;
            }).catch((error) => {
                getConnectionManager().get().close();
                return error;
            });
        } catch (error) {
            return error;
        }
    }


    async findAll() {
        try {
            return createConnection().then(async (connection) => {
                const productRepository = connection.getRepository(Product);
                const products = await productRepository.find({relations: ['category']});
                connection.close();
                return products;
            }).catch((error) => {
                getConnectionManager().get().close();
                return error;
            });
        } catch (error) {
            return error;
        }
    }

    async delete(productId: string) {
        try {
            return createConnection().then(async (connection) => {
                const productRepository = connection.getRepository(Product);
                await productRepository.delete({ id: productId });
                connection.close();
                return { message: "Produto removido com sucesso" };
            }).catch((error) => {
                getConnectionManager().get().close();
                return error;
            });
        } catch (error) {
            return error;
        }
    }
}


export { ProductRepository }