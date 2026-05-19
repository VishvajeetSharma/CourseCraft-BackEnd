import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "masterplan" })
export class MasterPlan {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  name!: string;

  @Column({ nullable: true })
  desc!: string;

  @Column({ type: "int", nullable: true })
  credit!: number;

  @Column({ type: "int", nullable: true })
  price!: number;

  @Column({ type: "int", nullable: true })
  offer!: number;

  @Column({ type: "int", nullable: true })
  duration!: number;

  @Column({ type: "int", default: 0 })
  is_rec!: number;

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
