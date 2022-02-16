import { expect } from "chai";
import { describe, it } from "mocha";
import CourseSequenceResolver from "../../../src/domain/service/CourseNamesSequenceResolver";

describe("Course names sequence resolver test", () => {
  it("Should return courses sequence", () => {
    // when
    const result = CourseSequenceResolver.getSequence();

    // then
    expect(result).to.eql([
      "Finance",
      "Investiment",
      "InvestmentManagement",
      "PortfolioTheories",
      "InvestmentStyle",
      "PortfolioConstruction",
    ]);
  });
});
