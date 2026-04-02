import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "users" })
export class users extends BaseEntity {
    @PrimaryGeneratedColumn({ name: "id" })
    id: any

    @Column({ name: "name", type: 'varchar', length: 255, nullable: true })
    name: any

    @Column({ name: "email", type: 'varchar', length: 255, unique: true })
    email: any

    @Column({ name: "password", type: 'varchar', length: 255, nullable: true })
    password: any

    @Column({ name: "mobile", type: 'varchar', length: 255, nullable: true })
    mobile: any

    @Column({ name: "profile", type: 'varchar', length: 255, nullable: true })
    profile: any

    @Column({ name: "address", type: 'varchar', length: 255, nullable: true })
    address: any

    @Column({ name: "credit", type: 'int', default: 3 })
    credit: any

    @Column({ name: "otp", type: 'varchar',nullable:true })
    otp: any

     @Column({ name: "status", type: 'int', default:1})
    status: any  
    
    @Column({ name: "created_at", type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    created_at: any;

    @Column({ name: "updated_at", type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    updated_at: any;

}