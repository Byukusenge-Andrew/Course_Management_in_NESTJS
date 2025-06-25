/* eslint-disable prettier/prettier */

import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Enrollment } from '../entities/enrollment.entity';
import { Course } from '../entities/course.entity';
import { User } from '../entities/user.entity';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';

@Injectable()
export class EnrollmentsService {
  constructor(
    @InjectRepository(Enrollment)
    private enrollmentsRepository: Repository<Enrollment>,
    @InjectRepository(Course)
    private coursesRepository: Repository<Course>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createEnrollmentDto: CreateEnrollmentDto, userId: number): Promise<Enrollment> {
    const { courseId } = createEnrollmentDto;
    const user = await this.usersRepository.findOneBy({ id: userId });
    const course = await this.coursesRepository.findOneBy({ id: courseId });
    
    if (!user || !course) {
      throw new NotFoundException('User or Course not found');
    }

    const existingEnrollment = await this.enrollmentsRepository.findOne({
      where: { user: { id: userId }, course: { id: courseId } },
    });

    if (existingEnrollment) {
      throw new ConflictException('User is already enrolled in this course');
    }

    const enrollment = this.enrollmentsRepository.create({
      user,
      course,
      enrolledAt: new Date(),
    });

    return this.enrollmentsRepository.save(enrollment);
  }

  findAll(): Promise<Enrollment[]> {
    return this.enrollmentsRepository.find({ relations: ['user', 'course'] });
  }

  async findOne(id: number): Promise<Enrollment> {
    const enrollment = await this.enrollmentsRepository.findOne({
      where: { id },
      relations: ['user', 'course'],
    });
    if (!enrollment) {
      throw new NotFoundException('Enrollment not found');
    }
    return enrollment;
  }

  async remove(id: number): Promise<void> {
    await this.enrollmentsRepository.delete(id);
  }
}