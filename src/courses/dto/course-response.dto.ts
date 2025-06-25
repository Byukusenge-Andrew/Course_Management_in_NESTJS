/* eslint-disable prettier/prettier */

import { Enrollment } from "src/entities/enrollment.entity";

export class CourseResponseDto {
  id!: string;
  title!: string;
  description!: string;
  instructor!: {
        id: string;
        email: string;
        name: string;
        role: string;
    } | null;
  enrollments!: Enrollment[];
}