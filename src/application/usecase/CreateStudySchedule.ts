import StudySchedule from "../../domain/entity/StudySchedule";
import StudyScheduleRepository from "../../domain/repository/StudyScheduleRepository";
import CourseNamesSequenceResolver from "../../domain/service/CourseNamesSequenceResolver";
import CoursesDto from "../dto/request/CoursesDto";
import DesiredMicroCoursesDto from "../dto/request/DesiredMicroCoursesDto";

export default class CreateStudySchedule {
  constructor(private studyScheduleRepository: StudyScheduleRepository) {}

  async execute(
    desiredMicroCoursesDto: DesiredMicroCoursesDto
  ): Promise<StudySchedule> {
    const courseNamesSequence = CourseNamesSequenceResolver.getSequence();

    const orderedCoursesToStudy: string[] = courseNamesSequence
      .map((courseName: string) =>
        this.getCourseNameIfIsDesiredOrReturnEmpty(
          desiredMicroCoursesDto.courses,
          courseName
        )
      )
      .filter((courseName) => courseName != "");

    const studySchedule = new StudySchedule(
      desiredMicroCoursesDto.userId,
      orderedCoursesToStudy
    );

    return await this.studyScheduleRepository.save(studySchedule);
  }

  private getCourseNameIfIsDesiredOrReturnEmpty(
    coursesDto: CoursesDto[],
    courseName: string
  ): string {
    const courseInCoursesDto = coursesDto.filter(
      (courseDto) =>
        courseDto.desiredCourse == courseName ||
        courseDto.requiredCourse == courseName
    );
    
    return courseInCoursesDto.length > 0 ? courseName : ""
  }
}
