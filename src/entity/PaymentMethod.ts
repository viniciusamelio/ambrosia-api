import {Entity, Column, PrimaryColumn} from "typeorm";

@Entity()
export class PaymentMethod {

    @PrimaryColumn({unique:true})
    id: string;

    @Column({length:30})
    title:string;

}
