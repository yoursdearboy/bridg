import api from "@/api";
import { renderRoute } from "@/test-utils";
import dayjs from "dayjs";
import { expect, it, vi } from "vitest";
import { Route } from "./$subjectId";

it("show page renders correctly", async () => {
  vi.spyOn(
    api.subjects,
    "showSpacesSpaceIdSubjectsSubjectIdGet"
  ).mockResolvedValue({
    id: "2703d0bc-7ed4-497c-91c6-30d86a8eb630",
    status: "eligible",
    statusDate: dayjs("2024-11-06T12:00:00").toDate(),
    performingBiologicEntity: {
      id: "8498d20d-6c84-4f09-96c5-5af3a557b1e3",
      administrativeGenderCode: "M",
      birthDate: dayjs("1991-01-01").toDate(),
      deathDate: null,
      deathDateEstimatedIndicator: null,
      deathIndicator: false,
      primaryName: "Donald Trump Jr",
    },
    performingOrganization: null,
  });
  expect((await renderRoute(Route)).asFragment()).toMatchSnapshot();
});
