import { Request, Response, Router } from "express";
import { plainToInstance, instanceToPlain } from "class-transformer";
import DesiredMicroCoursesDto from "../../application/dto/request/DesiredMicroCoursesDto";
import { studyScheduleContoller } from "../factory/StudyScheduleControllerFactory";

export const studyScheduleRoute = Router();

studyScheduleRoute.post(
  "/",
  async (request: Request<DesiredMicroCoursesDto>, response: Response) => {
    const desiredMicroCoursesDto = parseJsonToDto(request);

    const studySchedule = await studyScheduleContoller.createStudySchedule(
      desiredMicroCoursesDto
    );

    return studySchedule.responseBody == undefined
      ? response.status(400).json({ errors: studySchedule })
      : response.status(201).json(instanceToPlain(studySchedule));
  }
);

const parseJsonToDto = (
  request: Request<DesiredMicroCoursesDto>
): DesiredMicroCoursesDto => {
  return plainToInstance(
    DesiredMicroCoursesDto,
    request.body as DesiredMicroCoursesDto
  );
};
