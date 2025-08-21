import { describe, expect, it, vi } from "vitest";
import { renderComponent } from "@/test-utils";
import { NamesCard } from "./NamesCard";
import api from "@/api";

describe("NamesCard", () => {
  it("matches snapshot", () => {
    vi.spyOn(api.persons, "indexPersonsPersonIdNamesGet").mockResolvedValue([
      {
        id: "1",
        label: "Charlie May Kai",
      },
      {
        id: "2",
        label: "Nancy Jonson Mia",
      },
    ]);

    expect(
      renderComponent(
        <NamesCard personId="2703d0bc-7ed4-497c-91c6-30d86a8eb630" />
      ).asFragment()
    ).toMatchSnapshot();
  });
});
