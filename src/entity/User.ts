import {Entity, Column, PrimaryColumn} from "typeorm";

@Entity()
export class User {

    @PrimaryColumn({unique:true})
    id: string;

    @Column({length: 50})
    name: string;

    @Column()
    birthdate: Date;
    
    @Column()
    password: string;

    @Column({length: 50,unique:true})
    email: string;

}
