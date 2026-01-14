import { expect, it, vi } from "vitest";
import api from "@/api";
import { renderRoute } from "@/test-utils";
import { Route } from "./index";

it("index pages renders correctly", async () => {
  vi.spyOn(api, "indexSpaceSpaceIdSubjectGet").mockResolvedValue([
    {
      id: "2703d0bc-7ed4-497c-91c6-30d86a8eb630",
      status: "eligible",
      statusDate: new Date("2024-11-06T12:00:00"),
      performingBiologicEntity: {
        id: "8498d20d-6c84-4f09-96c5-5af3a557b1e3",
        administrativeGenderCode: "M",
        birthDate: new Date("1991-01-01"),
        deathDate: null,
        deathDateEstimatedIndicator: null,
        deathIndicator: false,
        identifier: [],
        primaryName: {
          id: "9de936fd-75b4-4021-a31f-4a243033b59f",
          label: "Donald Trump Jr",
        },
      },
      performingOrganization: null,
    },
    {
      id: "a698c952-143a-481d-8bd7-647758a1097c",
      status: "candidate",
      statusDate: new Date("2025-07-28T23:01:24"),
      performingBiologicEntity: {
        id: "ba6107f6-0891-44c5-8d84-01352f32ace2",
        administrativeGenderCode: "F",
        birthDate: new Date("2001-01-01"),
        deathDate: null,
        deathDateEstimatedIndicator: null,
        deathIndicator: false,
        identifier: [],
        primaryName: {
          id: "fe43f481-90e9-484e-8d9d-9aeb92bf609a",
          label: "Kamala Harris",
        },
      },
      performingOrganization: null,
    },
  ]);
  expect((await renderRoute(Route)).asFragment()).toMatchSnapshot();
});
