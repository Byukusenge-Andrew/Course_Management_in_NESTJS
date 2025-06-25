/* eslint-disable prettier/prettier */

import { Module } from "@nestjs/common";
import { EnrollmentsService } from "./enrollments.service";
import { EnrollmentsController } from "./enrollments.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Enrollment } from "../entities/enrollment.entity";
import { Course } from "../entities/course.entity";
import { User } from "../entities/user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Enrollment, Course, User])],
  providers: [EnrollmentsService],
  controllers: [EnrollmentsController],
})
export class EnrollmentsModule {}
