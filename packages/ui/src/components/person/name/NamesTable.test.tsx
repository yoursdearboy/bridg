import { renderComponent } from "@/test-utils";
import { describe, expect, it } from "vitest";
import { NamesTable } from "./NamesTable";

describe("NamesTable", () => {
  it("matches snapshot", () => {
    const { asFragment } = renderComponent(
      <NamesTable
        names={[
          {
            id: "1",
            label: "Charlie May Kai",
          },
          {
            id: "2",
            label: "Nancy Jonson Mia",
          },
        ]}
        personId="1"
        onDeleteSuccess={() => {}}
        onUpdateSuccess={() => {}}
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
