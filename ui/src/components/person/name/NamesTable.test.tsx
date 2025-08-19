import { describe, it, expect } from "vitest";

import { renderComponent } from "@/test-utils";
import { NamesTable } from "./NamesTable";

describe("NamesTable", () => {
  it("matches snapshot", () => {
    const { asFragment } = renderComponent(
      <NamesTable
    names={[
          { family: "Charlie", given: "Kai", middle: "May", patronymic: "—" },
          { family: "Nancy", given: "Mia", middle: "Jonson", patronymic: "—" },
        ]}
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
