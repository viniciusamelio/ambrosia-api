import {Entity, Column, PrimaryColumn, OneToOne, JoinColumn} from "typeorm";
import { PaymentMethod } from "./PaymentMethod";
import { Order } from "./Order";

@Entity()
export class Payment {

    @PrimaryColumn({unique:true})
    id: string;

    @OneToOne(type => PaymentMethod)
    @JoinColumn({name: "payment_method_id"})
    paymentMethod: PaymentMethod;

    @OneToOne(type => Order)
    @JoinColumn({name: "order_id"})
    order: Order;

    @Column({length:20})
    status:string;

}
