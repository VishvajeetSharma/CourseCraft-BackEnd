import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "plan" })
export class plan extends BaseEntity {
    @PrimaryGeneratedColumn({ name: "id" })
    id: any

    @Column({ name: "plan_id", type: 'int', nullable: true })
    plan_id: any

    @Column({ name: "user_id", type: 'int', nullable: true })
    user_id: any
    
    @Column({ name: "status", type: 'int', default: 1 })
    status: any

    @Column({ name: "created_at", type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    created_at: any;

    @Column({ name: "updated_at", type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    updated_at: any;

}  