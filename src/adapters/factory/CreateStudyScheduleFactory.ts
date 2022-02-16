import CreateStudySchedule from "../../application/usecase/CreateStudySchedule";

export default interface CreateStudyScheduleFactory {
  create(): CreateStudySchedule;
}
