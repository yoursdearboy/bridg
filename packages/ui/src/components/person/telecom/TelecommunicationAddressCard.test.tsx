import { describe, expect, it, vi } from "vitest";
import api from "@/api";
import { renderComponent } from "@/test-utils";
import { TelecommunicationAddressCardWrapper } from "./TelecommunicationAddressCard";

describe("TelecommunicationAddressesCard", () => {
  it("matches snapshot", () => {
    vi.spyOn(
      api.persons,
      "indexPersonsPersonIdTelecommunicationAddressesGet"
    ).mockResolvedValue([
      {
        id: "1",
        label: "ftp Pizza",
      },
      {
        id: "2",
        label: "http Pineapple",
      },
    ]);

    expect(
      renderComponent(
        <TelecommunicationAddressCardWrapper personId="2703d0bc-7ed4-497c-91c6-30d86a8eb630" />
      ).asFragment()
    ).toMatchSnapshot();
  });
});
