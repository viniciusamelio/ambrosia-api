import {Entity, Column, PrimaryColumn, OneToOne, JoinColumn} from "typeorm";
import { Address } from "./Address";
import { User } from "./User";

@Entity()
export class Order {

    @PrimaryColumn({unique:true})
    id: string;

    @OneToOne(type => Address)
    @JoinColumn()
    address: Address;

    @OneToOne(type => User)
    @JoinColumn()
    user: User;

    @Column("json",{array:true})
    items : JSON[];

    @Column({length:20})
    status: string;

    @Column({type: 'float'})
    amount: number;

    @Column({name: "contact_email"})
    contactEmail: string;


}
