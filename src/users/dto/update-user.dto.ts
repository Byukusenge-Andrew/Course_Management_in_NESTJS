/* eslint-disable prettier/prettier */

import { IsString, IsOptional } from "class-validator";

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  password?: string;
}
