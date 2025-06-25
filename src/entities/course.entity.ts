/* eslint-disable prettier/prettier */

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { User } from "./user.entity";
import { Enrollment } from "./enrollment.entity";

@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column()
  description!: string;

  @ManyToOne(() => User, (user) => user.courses)
  instructor!: User;

  @OneToMany(() => Enrollment, (enrollment) => enrollment.course)
  enrollments!: Enrollment[];
}
