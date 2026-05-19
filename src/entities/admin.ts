import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "admin" })
export class Admin {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  name!: string;

  @Column({ nullable: true })
  email!: string;

  @Column({ nullable: true })
  password!: string;

  @Column({ nullable: true })
  mobile!: string;

  @Column({ nullable: true })
  profile!: string;

  @Column({ nullable: true })
  address!: string;

  @Column({ nullable: true })
  otp!: string;

  @Column({ type: "int", default: 1 })
  status!: number;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at!: Date;

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  updated_at!: Date;
}
