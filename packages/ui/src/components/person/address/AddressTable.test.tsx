import { renderComponent } from "@/test-utils";
import { describe, expect, it } from "vitest";
import { AddressTable } from "./AddressTable";

describe("NamesTable", () => {
  it("matches snapshot", () => {
    const { asFragment } = renderComponent(
      <AddressTable
        addresses={[
          {
            id: "1",
            label: "Trafalgar Square",
          },
          {
            id: "2",
            label: "Red Square",
          },
        ]}
        personId="1"
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
