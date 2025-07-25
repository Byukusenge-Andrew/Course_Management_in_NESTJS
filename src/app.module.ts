// src/app.module.ts
import { ConfigModule } from "@nestjs/config";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { CoursesModule } from "./courses/courses.module";
import { EnrollmentsModule } from "./enrollments/enrollments.module";
import { User } from "./entities/user.entity";
import { Course } from "./entities/course.entity";
import { Enrollment } from "./entities/enrollment.entity";
import { UuidModule } from "nestjs-uuid";
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.DB_HOST || "localhost",
      port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
      username: process.env.DB_USERNAME || "postgres",
      password: process.env.DB_PASSWORD || "",
      database: process.env.DB_NAME || "test",
      entities: [User, Course, Enrollment],
      synchronize: true, // Set to false in production
      autoLoadEntities: true, // Automatically load entities
    }),
    AuthModule,
    UuidModule,
    UsersModule,
    CoursesModule,
    EnrollmentsModule,
  ],
})
export class AppModule {}
