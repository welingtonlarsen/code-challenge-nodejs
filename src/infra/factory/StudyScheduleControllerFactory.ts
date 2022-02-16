import { container } from "tsyringe";
import StudyScheduleController from "../../adapters/controller/StudyScheduleController";
import CreateStudyScheduleFactoryTsYRing from "./CreateStudyScheduleFactoryTsYRing";

const createStudyScheduleFactory = container.resolve(
  CreateStudyScheduleFactoryTsYRing
);
export const studyScheduleContoller = new StudyScheduleController(
  createStudyScheduleFactory
);
