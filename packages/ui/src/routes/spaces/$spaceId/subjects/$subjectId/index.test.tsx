import { queryOptions } from "@tanstack/react-query";
import { expect, it } from "vitest";
import { renderRoute } from "@/test-utils";
import { Route } from "./index";

it("show page renders correctly", async () => {
  const spaceId = "d918cda8-6aa7-45f6-8f58-6243800c8d5a";
  const subjectId = "2703d0bc-7ed4-497c-91c6-30d86a8eb630";
  const subjectQuery = queryOptions({
    queryKey: ["subject", subjectId],
    queryFn: () => ({
      id: subjectId,
      status: "eligible",
      statusDate: new Date("2024-11-06T12:00:00"),
      performingBiologicEntity: {
        id: "8498d20d-6c84-4f09-96c5-5af3a557b1e3",
        administrativeGenderCode: "M",
        birthDate: new Date("1991-01-01"),
        deathDate: null,
        deathDateEstimatedIndicator: null,
        deathIndicator: false,
        primaryName: {
          id: "9de936fd-75b4-4021-a31f-4a243033b59f",
          label: "Donald Trump Jr",
        },
      },
      performingOrganization: null,
    }),
  });

  expect(
    (
      await renderRoute(Route, {
        params: { spaceId, subjectId },
        beforeLoad: () => ({
          subjectQuery,
        }),
      })
    ).asFragment()
  ).toMatchSnapshot();
});
