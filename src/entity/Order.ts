import {Entity, Column, PrimaryColumn, JoinColumn, ManyToOne} from "typeorm";
import { Address } from "./Address";
import { User } from "./User";

@Entity()
export class Order {

    @PrimaryColumn({unique:true})
    id: string;

    @ManyToOne(type => Address, address=>address.id)
    @JoinColumn()
    address: Address;

    @ManyToOne(type => User, user=>user.id)
    @JoinColumn()
    user: User;

    @Column({type: "longtext"})
    items : string;

    @Column({length:20})
    status: string;

    @Column({type: 'float'})
    amount: number;

    @Column({name: "contact_email"})
    contactEmail: string;


}
