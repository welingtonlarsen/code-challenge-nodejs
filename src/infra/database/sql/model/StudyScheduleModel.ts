import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import CourseModel from "./CourseModel";

@Entity()
export default class StudyScheduleModel {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  userId!: string;

  @ManyToMany(() => CourseModel)
  @JoinTable()
  courses!: CourseModel[];

  constructor(id?: number, userId?: string, courses?: CourseModel[]) {
    this.id = id!;
    this.userId = userId!;
    this.courses = courses!;
  }
}
