import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "message" })
export class Message {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "int", nullable: true })
  room_id!: number;

  @Column({ type: "int", nullable: true })
  sender_id!: number;

  @Column({ type: "int", nullable: true })
  reciever_id!: number;

  @Column({ nullable: true })
  message!: string;

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
