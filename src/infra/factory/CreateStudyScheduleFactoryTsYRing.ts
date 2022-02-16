import { inject, injectable } from "tsyringe";
import CreateStudyScheduleFactory from "../../adapters/factory/CreateStudyScheduleFactory";
import CreateStudySchedule from "../../application/usecase/CreateStudySchedule";
import StudyScheduleRepository from "../../domain/repository/StudyScheduleRepository";

@injectable()
export default class CreateStudyScheduleFactoryTsYRing implements CreateStudyScheduleFactory{
  constructor(
    @inject("StudyScheduleRepository")
    private studyScheduleRepository: StudyScheduleRepository
  ) {}

  create(): CreateStudySchedule {
    return new CreateStudySchedule(this.studyScheduleRepository);
  }
}
