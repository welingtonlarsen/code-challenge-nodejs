import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import CourseModel from "./CourseModel";

@Entity("study_schedule")
export default class StudyScheduleModel {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  userId!: string;

  @ManyToMany(() => CourseModel)
  @JoinTable({name: "study_schedule_courses"})
  courses!: CourseModel[];

  constructor(id?: number, userId?: string, courses?: CourseModel[]) {
    this.id = id!;
    this.userId = userId!;
    this.courses = courses!;
  }
}
