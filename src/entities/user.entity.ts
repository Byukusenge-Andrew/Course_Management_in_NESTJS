/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Enrollment } from "./enrollment.entity";
import { Course } from "./course.entity";

// import {Enrollment} from './enrollment.entity';


@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  email!: string;

  @Column()
  password!: string;

  @Column()
  name!: string;

  @Column({ default: "student" })
  role!: string;

  @OneToMany(() => Enrollment, (enrollment) => enrollment.user)
  enrollments!: Enrollment[];

  @OneToMany(() => Course, (course) => course.instructor)
  courses!: Course[];
}
