/* eslint-disable prettier/prettier */

import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Course } from "../entities/course.entity";
import { User } from "../entities/user.entity";
import { CreateCourseDto } from "./dto/create-course.dto";
import { UpdateCourseDto } from "./dto/update-course.dto";
import { CourseResponseDto } from "./dto/course-response.dto";

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private coursesRepository: Repository<Course>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(
    createCourseDto: CreateCourseDto,
    instructorId: string,
  ): Promise<Course> {
    const instructor = await this.usersRepository.findOneBy({
      id: instructorId,
    });
    if (!instructor) {
      throw new NotFoundException("Instructor not found");
    }
    const course = this.coursesRepository.create({
      ...createCourseDto,
      instructor,
    });
    return this.coursesRepository.save(course);
  }

  findAll(): Promise<Course[]> {
    return this.coursesRepository.find({ relations: ["instructor"] });
  }

async findOne(id: string): Promise<CourseResponseDto> {
  const course = await this.coursesRepository.findOne({
    where: { id },
    relations: ["instructor", "enrollments"],
  });
  if (!course) {
    throw new NotFoundException("Course not found");
  }
  const { instructor, ...courseData } = course;
  let instructorWithoutPassword = null;
  if (instructor) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...rest } = instructor;
    instructorWithoutPassword = rest;
  }
  return { ...courseData, instructor: instructorWithoutPassword, enrollments: course.enrollments };
}

  async update(id: string, updateCourseDto: UpdateCourseDto): Promise<CourseResponseDto> {
  await this.coursesRepository.update(id, updateCourseDto);
  return this.findOne(id);
}

  async remove(id: string): Promise<void> {
    await this.coursesRepository.delete(id);
  }
}
