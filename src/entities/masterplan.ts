import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "masterplan" })
export class masterplan extends BaseEntity {
  @PrimaryGeneratedColumn({ name: "id" })
  id: any;

  @Column({ name: "name", type: "varchar", length: 255, nullable: true })
  name: any;

  @Column({ name: "desc", type: "varchar", length: 255, nullable: true })
  desc: any;

  @Column({ name: "credit", type: "int", nullable: true })
  credit: any;

  @Column({ name: "price", type: "int", nullable: true })
  price: any;


  @Column({ name: "offer", type: "int", nullable: true })
  offer: any;

  @Column({ name: "duration", type: "int", nullable: true })
  duration: any;

  
  @Column({ name: "is_rec", type: "int", default:0 })
  is_rec: any; 
  @Column({ name: "status", type: "int", default: 1 })
  status: any;

  @Column({
    name: "created_at",
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
  })
  created_at: any;

  @Column({
    name: "updated_at",
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
  })
  updated_at: any;
}
