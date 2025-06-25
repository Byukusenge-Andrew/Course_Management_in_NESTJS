/* eslint-disable prettier/prettier */

import { IsNumber } from "class-validator";

export class CreateEnrollmentDto {
  @IsNumber()
  courseId!: string;
}
