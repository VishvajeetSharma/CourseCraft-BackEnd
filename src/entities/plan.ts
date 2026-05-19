import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "plan" })
export class Plan {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "int", nullable: true })
  plan_id!: number;

  @Column({ type: "int", nullable: true })
  user_id!: number;

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
