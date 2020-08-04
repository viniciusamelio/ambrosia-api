import {Entity, Column, PrimaryColumn, OneToOne, JoinColumn} from "typeorm";

@Entity()
export class ProductCategory {

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

    @OneToOne(type => ProductCategory)
    @JoinColumn({name:"product_category_id"})
    category: ProductCategory;

    @Column()
    image: string;

}