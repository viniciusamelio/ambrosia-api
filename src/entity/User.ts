import {Entity, Column, PrimaryColumn, OneToMany, ManyToMany, JoinTable} from "typeorm";
import { Address } from "./Address";

@Entity()
export class User {

    @PrimaryColumn({unique:true})
    id: string;

    @OneToMany(type=> Address, address=> address.user)
    addresses: Address[]

    @Column()
    role:string;

    @Column({length: 50})
    name: string;

    @Column()
    birthdate: Date;
    
    @Column()
    password: string;

    @Column({length: 50,unique:true})
    email: string;

    @Column({length: 14, nullable:true,unique:true})
    cpf: string;

    @Column({length: 16, nullable:true})
    phone: string;

}
