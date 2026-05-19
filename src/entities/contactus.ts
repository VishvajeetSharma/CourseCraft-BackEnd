import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "contactus" })
export class Contactus {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  name!: string;

  @Column({ unique: true })
  email!: string;

  @Column({ nullable: true })
  mobile!: string;

  @Column({ nullable: true })
  subject!: string;

  @Column({ nullable: true })
  des!: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at!: Date;

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  updated_at!: Date;
}
