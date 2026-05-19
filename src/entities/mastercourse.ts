import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "mastercourse" })
export class MasterCourse {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  thumbnail!: string;

  @Column({ nullable: true })
  title!: string;

  @Column({ nullable: true })
  desc!: string;

  @Column({ nullable: true })
  level!: string;

  @Column({ nullable: true })
  rating!: string;

  @Column({ nullable: true })
  duration!: string;

  @Column({ nullable: true })
  type!: string;

  @Column({ nullable: true })
  content!: string;

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
