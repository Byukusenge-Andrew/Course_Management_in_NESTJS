/* eslint-disable prettier/prettier */
import { IsEmail, IsString, IsNotEmpty, IsIn } from "class-validator";

export class CreateUserDto {
  @IsEmail()
  email!: string;

  @IsString()
  @IsNotEmpty()
  password!: string;

  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsIn(["student", "instructor", "admin"])
  role!: string;
}
