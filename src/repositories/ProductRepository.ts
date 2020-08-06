import { createConnection, getConnectionManager } from "typeorm";
import { Product } from "../entity/Product";



class ProductRepository{
    async save(product: Product){
        try {
            return createConnection().then( async (connection)=>{
                const productRepository = connection.getRepository(Product);
                await productRepository.save(product);
                const savedProduct = await productRepository.findOne({id: product.id});
                connection.close();
                return savedProduct;
            }).catch((error)=>{
                getConnectionManager().get().close();
                return error;
            });
        } catch (error) {
            return error;
        }
    }

    async find(productId: string, categoryId:String = null){
        try {
            return createConnection().then( async (connection)=>{
                const productRepository = connection.getRepository(Product);
                let product : Product[];

                if(categoryId){
                    product = await productRepository.find({category: {id: `${categoryId}`}});
                }else{
                    product = await productRepository.find({id: productId});
                }
                
                connection.close();
                return product;
            }).catch((error)=>{
                getConnectionManager().get().close();
                return error;
            });
        } catch (error) {
            return error;
        }
    }
    

    async findAll(){
        try {
            return createConnection().then( async (connection)=>{
                const productRepository = connection.getRepository(Product);
                const products = await productRepository.find();
                connection.close();
                return products;
            }).catch((error)=>{
                getConnectionManager().get().close();
                return error;
            });
        } catch (error) {
            return error;
        }
    }

    async delete(productId:string){
        try {
            return createConnection().then( async (connection)=>{
                const productRepository = connection.getRepository(Product);
                await productRepository.delete({id: productId});
                connection.close();
                return {message: "Produto removido com sucesso"};
            }).catch((error)=>{
                getConnectionManager().get().close();
                return error;
            });
        } catch (error) {
            return error;
        }
    }
}


export {ProductRepository}