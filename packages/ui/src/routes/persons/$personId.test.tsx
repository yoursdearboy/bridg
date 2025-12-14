import { expect, it, vi } from "vitest";
import api from "@/api";
import { renderRoute } from "@/test-utils";
import { Route } from "./$personId";

it("person page renders correctly", async () => {
  vi.spyOn(api.persons, "showPersonsPersonIdGet").mockResolvedValue({
    administrativeGenderCode: "M",
    birthDate: new Date("1991-01-01"),
    deathDate: null,
    deathDateEstimatedIndicator: null,
    deathIndicator: false,
    id: "99132ae7-25dd-43ba-808e-cdb3b29af285",
    primaryName: {
      use: "official",
      family: "Иванов",
      given: "Иван",
      middle: null,
      patronymic: null,
      prefix: null,
      suffix: "Мл.",
      id: "8dcdea7d-f610-49b7-b302-c2b0f6aee926",
      label: "Иван Иванов Мл.",
    },
  });
  expect(
    (
      await renderRoute(Route, {
        params: {
          personId: "xxxx",
        },
      })
    ).asFragment()
  ).toMatchSnapshot();
});
