import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from "typeorm";
import { User } from "./user.entity";
import { Course } from "./course.entity";

@Entity()
export class Enrollment {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => User, (user) => user.enrollments)
  user!: User;

  @ManyToOne(() => Course, (course) => course.enrollments)
  course!: Course;

  @Column()
  enrolledAt!: Date;
}
