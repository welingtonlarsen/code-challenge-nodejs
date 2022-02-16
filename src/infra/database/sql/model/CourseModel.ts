import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("course")
export default class CourseModel {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}
