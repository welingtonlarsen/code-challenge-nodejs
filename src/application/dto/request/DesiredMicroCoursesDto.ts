import { ArrayNotEmpty, IsNotEmpty } from "class-validator";
import CoursesDto from "./CoursesDto";

export default class DesiredMicroCoursesDto {
  @IsNotEmpty()
  readonly userId: string;

  @ArrayNotEmpty()
  readonly courses: CoursesDto[];

  constructor(userId: string, courses: CoursesDto[]) {
    this.userId = userId;
    this.courses = courses;
  }
}
