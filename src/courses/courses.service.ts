/* eslint-disable prettier/prettier */

import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Course } from "../entities/course.entity";
import { User } from "../entities/user.entity";
import { CreateCourseDto } from "./dto/create-course.dto";
import { UpdateCourseDto } from "./dto/update-course.dto";

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
    instructorId: number,
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

  async findOne(id: number): Promise<Course> {
    const course = await this.coursesRepository.findOne({
      where: { id },
      relations: ["instructor"],
    });
    if (!course) {
      throw new NotFoundException("Course not found");
    }
    return course;
  }

  async update(id: number, updateCourseDto: UpdateCourseDto): Promise<Course> {
    await this.coursesRepository.update(id, updateCourseDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.coursesRepository.delete(id);
  }
}
