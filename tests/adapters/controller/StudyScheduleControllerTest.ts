import { expect } from "chai";
import { ValidationError } from "class-validator";
import { describe, it } from "mocha";
import { stubInterface } from "ts-sinon";
import StudyScheduleController from "../../../src/adapters/controller/StudyScheduleController";
import CreateStudyScheduleFactory from "../../../src/adapters/factory/CreateStudyScheduleFactory";
import CoursesDto from "../../../src/application/dto/request/CoursesDto";
import DesiredMicroCoursesDto from "../../../src/application/dto/request/DesiredMicroCoursesDto";
import CreateStudySchedule from "../../../src/application/usecase/CreateStudySchedule";
import StudySchedule from "../../../src/domain/entity/StudySchedule";

describe("Study schedule controller test", () => {
  // Prepare
  const useCaseStub = stubInterface<CreateStudySchedule>();
  useCaseStub.execute.returns(
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

  const factoryStub = stubInterface<CreateStudyScheduleFactory>();
  factoryStub.create.returns(useCaseStub);

  const studyScheduleController = new StudyScheduleController(factoryStub);

  it("Should create success response containing a study schedule", async () => {
    // given
    const desiredMicroCoursesDto = new DesiredMicroCoursesDto("asdjfhasldf", [
      new CoursesDto("PortfolioConstruction", "PortfolioTheories"),
      new CoursesDto("InvestmentManagement", "Investment"),
      new CoursesDto("Investment", "Finance"),
      new CoursesDto("PortfolioTheories", "Investment"),
      new CoursesDto("InvestmentStyle", "InvestmentManagement"),
    ]);

    // when
    const result = await studyScheduleController.createStudySchedule(
      desiredMicroCoursesDto
    );

    // then
    expect(result.responseBody).to.eql(
      new StudySchedule("asdjfhasldf", [
        "Finance",
        "InvestmentManagement",
        "PortfolioTheories",
        "InvestmentStyle",
        "PortfolioConstruction",
      ])
    );
  });

  it("Should create error response containing error validation messages", async () => {
    // given
    const desiredMicroCoursesDto = new DesiredMicroCoursesDto(undefined!!, [
      new CoursesDto("PortfolioConstruction", "PortfolioTheories"),
      new CoursesDto("InvestmentManagement", "Investment"),
      new CoursesDto("Investment", "Finance"),
      new CoursesDto("PortfolioTheories", "Investment"),
      new CoursesDto("InvestmentStyle", "InvestmentManagement"),
    ]);

    // when
    const result = await studyScheduleController.createStudySchedule(
      desiredMicroCoursesDto
    );

    // then
    const expectResult = new ValidationError();
    expectResult.children = [];
    expectResult.constraints = { isNotEmpty: "userId should not be empty" };
    expectResult.property = "userId";
    expectResult.value = undefined!!;

    expect(result.errors!.length).to.equal(1);
    expect(result.errors![0]).to.eql(expectResult);
  });
});
