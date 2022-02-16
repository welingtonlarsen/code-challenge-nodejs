import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialStructure1644986279487 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE course_model (
        id int(11) NOT NULL AUTO_INCREMENT,
        name varchar(255) NOT NULL,
        PRIMARY KEY (id)
      ) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1`);

    await queryRunner.query(`CREATE TABLE study_schedule_model (
        id int(11) NOT NULL AUTO_INCREMENT,
        userId varchar(255) NOT NULL,
        PRIMARY KEY (id)
      ) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1`);

    await queryRunner.query(`CREATE TABLE study_schedule_model_courses_course_model (
        studyScheduleModelId int(11) NOT NULL,
        courseModelId int(11) NOT NULL,
        PRIMARY KEY (studyScheduleModelId,courseModelId),
        KEY IDX_f11e67e2cd2715de7e10cf29d0 (studyScheduleModelId),
        KEY IDX_aab5297f81612e6325c0d22bbf (courseModelId),
        CONSTRAINT FK_aab5297f81612e6325c0d22bbf8 FOREIGN KEY (courseModelId) REFERENCES course_model (id) ON DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT FK_f11e67e2cd2715de7e10cf29d02 FOREIGN KEY (studyScheduleModelId) REFERENCES study_schedule_model (id) ON DELETE CASCADE ON UPDATE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=latin1`);

    await queryRunner.query(`INSERT INTO course_model (id, name) 
    VALUES (1, "Finance"), 
    (2, "Investment"), 
    (3, "InvestmentManagement"), 
    (4, "PortfolioTheories"), 
    (5, "InvestmentStyle"), 
    (6, "PortfolioConstruction")`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
