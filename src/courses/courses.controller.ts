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
} from "@nestjs/common";
import { CoursesService } from "./courses.service";
import { CreateCourseDto } from "./dto/create-course.dto";
import { UpdateCourseDto } from "./dto/update-course.dto";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { Request as ExpressRequest } from "express";

@Controller("courses")
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Body() createCourseDto: CreateCourseDto,
    @Request() req: ExpressRequest & { user: { userId: number } },
  ) {
    return this.coursesService.create(createCourseDto, req.user.userId);
  }

  @Get()
  findAll() {
    return this.coursesService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.coursesService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.coursesService.update(+id, updateCourseDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.coursesService.remove(+id);
  }
}
