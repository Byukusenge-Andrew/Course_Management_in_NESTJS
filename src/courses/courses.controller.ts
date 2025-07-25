/* eslint-disable prettier/prettier */

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  UseInterceptors,
  UploadedFile,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { CoursesService } from "./courses.service";
import { CreateCourseDto } from "./dto/create-course.dto";
import { UpdateCourseDto } from "./dto/update-course.dto";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { Request as ExpressRequest ,Express} from "express";
import { FileInterceptor } from "@nestjs/platform-express";
import { extractCoursesfromExcelBuffer } from "src/utils/excel-reader";


@Controller("courses")
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Body() createCourseDto: CreateCourseDto,
    @Request() req: ExpressRequest & { user: { userId: string } },
  ) {
    return this.coursesService.create(createCourseDto, req.user.userId);
  }

  @Get()
  findAll() {
    return this.coursesService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.coursesService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post("import")
  @UseInterceptors(FileInterceptor("file"))
  async importCourses(
    @UploadedFile() file: Express.Multer.File,
    @Request() req: ExpressRequest & { user: { userId: string } },
  ) {
    if (!file || !file.buffer ) {
      throw new HttpException("File is required", HttpStatus.BAD_REQUEST);
    }
    const courses = extractCoursesfromExcelBuffer(file.buffer);

    for (const course of courses) {
      await this.coursesService.create(course, req.user.userId);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.coursesService.update(id, updateCourseDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.coursesService.remove(id);
  }
}
