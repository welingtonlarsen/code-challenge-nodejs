import { expect } from "chai";
import { describe } from "mocha";
import sinon from "sinon";
import { stubInterface } from "ts-sinon";
import CoursesDto from "../../../src/application/dto/request/CoursesDto";
import DesiredMicroCoursesDto from "../../../src/application/dto/request/DesiredMicroCoursesDto";
import CreateStudySchedule from "../../../src/application/usecase/CreateStudySchedule";
import StudySchedule from "../../../src/domain/entity/StudySchedule";
import StudyScheduleRepository from "../../../src/domain/repository/StudyScheduleRepository";

describe("Create study schedule test", () => {
  // Prepare
  const repositoryStub = stubInterface<StudyScheduleRepository>();
  repositoryStub.save.returns(
    new Promise((resolve) =>
      resolve(
        new StudySchedule("asdjfhasldf", [
          "Finance",
          "InvestmentManagement",
          "PortfolioTheories",
          "InvestmentStyle",
          "PortfolioConstruction",
        ])
      )
    )
  );
  const createStudyScheduleUseCase = new CreateStudySchedule(repositoryStub);

  it("Shoud create study schedule", async () => {
    // given
    const desiredMicroCoursesDto = new DesiredMicroCoursesDto("asdjfhasldf", [
      new CoursesDto("PortfolioConstruction", "PortfolioTheories"),
      new CoursesDto("InvestmentManagement", "Investment"),
      new CoursesDto("Investment", "Finance"),
      new CoursesDto("PortfolioTheories", "Investment"),
      new CoursesDto("InvestmentStyle", "InvestmentManagement"),
    ]);

    // when
    const result = await createStudyScheduleUseCase.execute(
      desiredMicroCoursesDto
    );

    // then
    expect(result).to.eql(
      new StudySchedule("asdjfhasldf", [
        "Finance",
        "InvestmentManagement",
        "PortfolioTheories",
        "InvestmentStyle",
        "PortfolioConstruction",
      ])
    );
  });
});
