import {Entity, Column, PrimaryColumn} from "typeorm";

@Entity()
export class ProductCategory {

    @PrimaryColumn({unique:true})
    id: string;

    @Column({length:30})
    name:string;

    @Column({length: 50})
    description: string;

}
