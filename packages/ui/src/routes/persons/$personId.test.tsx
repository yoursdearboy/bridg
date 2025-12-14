import { queryOptions } from "@tanstack/react-query";
import { expect, it } from "vitest";
import { renderRoute } from "@/test-utils";
import { Route } from "./$personId";

it("person page renders correctly", async () => {
  const personId = "99132ae7-25dd-43ba-808e-cdb3b29af285";
  const query = queryOptions({
    queryKey: ["person", personId],
    queryFn: () => ({
      administrativeGenderCode: "M",
      birthDate: new Date("1991-01-01"),
      deathDate: null,
      deathDateEstimatedIndicator: null,
      deathIndicator: false,
      id: personId,
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
    }),
  });
  expect(
    (
      await renderRoute(Route, {
        beforeLoad: () => ({ query }),
        params: { personId },
      })
    ).asFragment()
  ).toMatchSnapshot();
});
