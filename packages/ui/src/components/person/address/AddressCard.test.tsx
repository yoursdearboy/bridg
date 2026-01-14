import { describe, expect, it, vi } from "vitest";
import api from "@/api";
import { renderComponent } from "@/test-utils";
import { AddressCardWrapper } from "./AddressCard";

describe("NamesCard", () => {
  it("matches snapshot", () => {
    vi.spyOn(
      api.persons,
      "indexPersonPersonIdPostalAddressGet"
    ).mockResolvedValue([
      {
        id: "1",
        label: "Trafalgar Square",
      },
      {
        id: "2",
        label: "Red Square",
      },
    ]);

    expect(
      renderComponent(
        <AddressCardWrapper personId="2703d0bc-7ed4-497c-91c6-30d86a8eb630" />
      ).asFragment()
    ).toMatchSnapshot();
  });
});
