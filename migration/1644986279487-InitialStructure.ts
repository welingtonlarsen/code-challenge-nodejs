import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialStructure1644986279487 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE course (
        id int(11) NOT NULL AUTO_INCREMENT,
        name varchar(255) NOT NULL,
        PRIMARY KEY (id)
      )`);

    await queryRunner.query(`CREATE TABLE study_schedule (
        id int(11) NOT NULL AUTO_INCREMENT,
        userId varchar(255) NOT NULL,
        PRIMARY KEY (id)
      )`);

    await queryRunner.query(`CREATE TABLE study_schedule_courses (
        studyScheduleId int(11) NOT NULL,
        courseId int(11) NOT NULL,
        PRIMARY KEY (studyScheduleId,courseId),
        KEY IDX_f11e67e2cd2715de7e10cf29d0 (studyScheduleId),
        KEY IDX_aab5297f81612e6325c0d22bbf (courseId),
        CONSTRAINT FK_aab5297f81612e6325c0d22bbf8 FOREIGN KEY (courseId) REFERENCES course (id) ON DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT FK_f11e67e2cd2715de7e10cf29d02 FOREIGN KEY (studyScheduleId) REFERENCES study_schedule (id) ON DELETE CASCADE ON UPDATE CASCADE
      )`);

    await queryRunner.query(`INSERT INTO course (id, name) 
    VALUES (1, "Finance"), 
    (2, "Investment"), 
    (3, "InvestmentManagement"), 
    (4, "PortfolioTheories"), 
    (5, "InvestmentStyle"), 
    (6, "PortfolioConstruction")`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
