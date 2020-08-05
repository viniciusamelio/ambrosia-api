import { createConnection, getConnectionManager } from "typeorm";
import { ProductCategory } from "../entity/ProductCategory";

class CategoryRepository {
    async save(category: ProductCategory) {
        try {
            return createConnection().then(async connection => {
                const categoryRepository = connection.getRepository(ProductCategory);
                await categoryRepository.save(category);
                const savedCategory = await categoryRepository.findOne({ id: category.id });
                connection.close();
                return savedCategory;
            }).catch((error) => {
                getConnectionManager().get().close();
                return error;
            })
        } catch (error) {
            return error;
        }
    }

    async find(categoryId:string){
        try {
            return createConnection().then(async connection => {
                const categoryRepository = connection.getRepository(ProductCategory);
                const category = await categoryRepository.findOne({id:categoryId});
                connection.close();
                return category;
            }).catch((error) => {
                getConnectionManager().get().close();
                return error;
            })
        } catch (error) {
            return error;
        }
    }

    async findAll(){
        try {
            return createConnection().then(async connection => {
                const categoryRepository = connection.getRepository(ProductCategory);
                const category = await categoryRepository.find();
                connection.close();
                return category;
            }).catch((error) => {
                getConnectionManager().get().close();
                return error;
            })
        } catch (error) {
            return error;
        }
    }

    async delete(categoryId:string) {
        try {
            return createConnection().then(async connection => {
                const categoryRepository = connection.getRepository(ProductCategory);
                await categoryRepository.delete(categoryId);
            }).catch((error) => {
                getConnectionManager().get().close();
                return error;
            })
        } catch (error) {
            return error;
        }
    }
}

export { CategoryRepository }