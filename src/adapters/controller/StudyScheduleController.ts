import { validate, ValidationError } from "class-validator";
import DesiredMicroCoursesDto from "../../application/dto/request/DesiredMicroCoursesDto";
import CreateStudySchedule from "../../application/usecase/CreateStudySchedule";
import StudySchedule from "../../domain/entity/StudySchedule";
import CreateStudyScheduleFactory from "../factory/CreateStudyScheduleFactory";
import ControllerResponseDto from "../dto/response/ControllerResponseDto";

export default class StudyScheduleController {
  private createStudyScheduleUseCase: CreateStudySchedule;

  constructor(private createStudyScheduleFactory: CreateStudyScheduleFactory) {
    this.createStudyScheduleUseCase = createStudyScheduleFactory.create();
  }

  async createStudySchedule(
    desiredMicroCoursesDto: DesiredMicroCoursesDto
  ): Promise<ControllerResponseDto<StudySchedule>> {
    const validationErrors = await this.validateDto(desiredMicroCoursesDto);
    if (validationErrors.length)
      return ControllerResponseDto.ofErrors(StudySchedule, validationErrors);

    const studySchedule = await this.createStudyScheduleUseCase.execute(
      desiredMicroCoursesDto
    );
    return ControllerResponseDto.ofSuccess(studySchedule);
  }

  private validateDto = (
    dto: DesiredMicroCoursesDto
  ): Promise<ValidationError[]> => {
    return validate(dto, {
      validationError: { target: false },
    });
  };
}
