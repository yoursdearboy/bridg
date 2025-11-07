import { describe, expect, it } from "vitest";
import { renderComponent } from "@/test-utils";
import { PersonCard } from "./PersonCard";

describe("NamesTable", () => {
  it("matches snapshot", () => {
    const { asFragment } = renderComponent(
      <PersonCard
        person={{
          administrativeGenderCode: "M",
          birthDate: new Date("2025-09-03"),
          deathDate: new Date("2025-09-03"),
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
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
