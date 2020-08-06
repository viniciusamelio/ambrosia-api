import {Entity, Column, PrimaryColumn, OneToOne, JoinColumn, OneToMany, ManyToOne} from "typeorm";
import { ProductCategory } from "./ProductCategory";

@Entity()
export class Product{

    @PrimaryColumn({unique:true})
    id: string;

    @Column({length:30})
    name:string;

    @Column({length: 50})
    description: string;

    @Column({name:"is_available"})
    isAvailable: boolean;

    @Column({type: 'float'})
    price: number;

    @ManyToOne(type => ProductCategory, category=>category.id)
    @JoinColumn({name:"product_category_id"})
    category: ProductCategory;

    @Column()
    image: string;

}
