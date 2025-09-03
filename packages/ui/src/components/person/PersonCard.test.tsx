import { renderComponent } from "@/test-utils";
import { describe, expect, it } from "vitest";
import { PersonCard } from "./PersonCard";
import dayjs from "dayjs";

describe("NamesTable", () => {
  it("matches snapshot", () => {
    const { asFragment } = renderComponent(
      <PersonCard
        person={{
          administrativeGenderCode: "M",
          birthDate: dayjs("2025-09-03").toDate(),
          deathDate: dayjs("2025-09-03").toDate(),
          deathDateEstimatedIndicator: true,
          deathIndicator: true,
          id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          primaryName: {
            use: "string",
            family: "string",
            given: "string",
            middle: "string",
            patronymic: "string",
            prefix: "string",
            suffix: "string",
            id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            label: "string",
          },
        }}
        personId="1"
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
