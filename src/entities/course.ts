import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "course" })
export class Course {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "int" })
  course_id!: number;

  @Column({ type: "int" })
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
