/* eslint-disable prettier/prettier */

import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from '../entities/course.entity';
import { User } from '../entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Course, User])],
  providers: [CoursesService],
  controllers: [CoursesController],
})
export class CoursesModule {}