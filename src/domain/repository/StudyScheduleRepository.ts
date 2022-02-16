import StudySchedule from "../entity/StudySchedule";

export default interface StudyScheduleRepository {
  save(studySchedule: StudySchedule): Promise<StudySchedule>;
}
