import api from "@/api";
import { renderRoute } from "@/test-utils";
import dayjs from "dayjs";
import { expect, it, vi } from "vitest";
import { Route } from "./index";

it("index pages renders correctly", async () => {
  vi.spyOn(api.subjects, "indexSpacesSpaceIdSubjectsGet").mockResolvedValue([
    {
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
    },
    {
      id: "a698c952-143a-481d-8bd7-647758a1097c",
      status: "candidate",
      statusDate: dayjs("2025-07-28T23:01:24").toDate(),
      performingBiologicEntity: {
        id: "ba6107f6-0891-44c5-8d84-01352f32ace2",
        administrativeGenderCode: "F",
        birthDate: dayjs("2001-01-01").toDate(),
        deathDate: null,
        deathDateEstimatedIndicator: null,
        deathIndicator: false,
        primaryName: "Kamala Harris",
      },
      performingOrganization: null,
    },
  ]);
  expect((await renderRoute(Route)).asFragment()).toMatchSnapshot();
});
