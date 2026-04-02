import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "mastercourse" })
export class mastercourse extends BaseEntity {
  @PrimaryGeneratedColumn({ name: "id" })
  id: any;

  @Column({ name: "thumbnail", type: "varchar", length: 255, nullable: true })
  thumbnail: any;

  @Column({ name: "title", type: "varchar", length: 255, nullable: true })
  title: any;

  @Column({ name: "desc", type: "varchar", length: 255, nullable: true })
  desc: any;
  
  @Column({ name: "level", type: "varchar", length: 255, nullable: true })
  level: any;

  @Column({ name: "rating", type: "varchar", length: 255, nullable: true })
  rating: any;

  @Column({ name: "duration", type: "varchar", length: 255, nullable: true })
  duration: any;

  @Column({ name: "type", type: "varchar", length: 255, nullable: true })
  type: any;

  @Column({ name: "content", type: "varchar", length: 255, nullable: true })
  content: any;

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
