import {Entity, Column, PrimaryColumn, ManyToOne, JoinColumn} from "typeorm";
import { User } from "./User";

@Entity()
export class Address {

    @PrimaryColumn({unique:true})
    id: string;

    @ManyToOne(type=>User, user=> user.addresses, {cascade:true})
    @JoinColumn({name:'user_id'})
    user: User;

    @Column({length: 20})
    title: string;

    @Column({length:40})
    street: string;
    
    @Column({length:10})
    number: string;

    @Column({length:40})
    neighborhood: string;
    
    @Column({length:40})
    city: string;

    @Column({length:2})
    state: string;

    @Column({length:9,name: "zip_code"})
    zipCode: string;

    @Column({length:40,nullable:true})
    reference: string;

}
