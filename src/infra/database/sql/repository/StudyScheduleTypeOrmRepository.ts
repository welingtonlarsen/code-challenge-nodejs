import { getRepository, Repository } from "typeorm";
import StudySchedule from "../../../../domain/entity/StudySchedule";
import StudyScheduleRepository from "../../../../domain/repository/StudyScheduleRepository";
import { getRedis, setRedis } from "../../cache/RedisConfig";
import { instanceToPlain } from "class-transformer";
import CourseModel from "../model/CourseModel";
import StudyScheduleModel from "../model/StudyScheduleModel";

export default class StudyScheduleTypeOrmRepository
  implements StudyScheduleRepository
{
  private studyScheduleRepository: Repository<StudyScheduleModel>;
  private courseRepository: Repository<CourseModel>;

  private COURSE_MODEL_KEY = "course-model-";

  constructor() {
    this.studyScheduleRepository = getRepository(StudyScheduleModel);
    this.courseRepository = getRepository(CourseModel);
  }

  async save(studySchedule: StudySchedule): Promise<StudySchedule> {
    const courseModels = await Promise.all(
      studySchedule.coursesSequence.map(async (courseName) =>
        this.findCourseByName(courseName)
      )
    );

    const studyScheduleModel = new StudyScheduleModel(
      undefined,
      studySchedule.userId,
      courseModels
    );

    await this.studyScheduleRepository.save(studyScheduleModel);

    const coursesSequenceString = studyScheduleModel.courses.map(
      (course) => course.name
    );

    return new StudySchedule(studyScheduleModel.userId, coursesSequenceString);
  }

  private async findCourseByName(courseName: string): Promise<CourseModel> {
    const courseModelRedisJson = await getRedis(
      `${this.COURSE_MODEL_KEY + courseName}`
    );

    return courseModelRedisJson
      ? (JSON.parse(courseModelRedisJson) as CourseModel)
      : this.findOneInSqlAndSaveInRedisCache(courseName);
  }

  private async findOneInSqlAndSaveInRedisCache(
    courseName: string
  ): Promise<CourseModel> {
    const courseModel = await this.courseRepository.findOneOrFail({
      where: {
        name: courseName,
      },
    });

    await setRedis(
      `${this.COURSE_MODEL_KEY + courseName}`,
      JSON.stringify(instanceToPlain(courseModel))
    );

    return courseModel;
  }
}
