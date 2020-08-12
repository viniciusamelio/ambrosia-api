import {Entity, Column, PrimaryColumn, JoinColumn, ManyToOne, OneToOne} from "typeorm";
import { Address } from "./Address";
import { User } from "./User";
import { Payment } from "./Payment";

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

    @OneToOne(type=>Payment, payment=>payment.id)
    @JoinColumn({name: "payment_id"})
    payment: Payment;


    @Column({type: "longtext"})
    items : string;

    @Column({length:20})
    status: string;

    @Column({type: 'float'})
    amount: number;

    @Column({name: "contact_email"})
    contactEmail: string;


}
