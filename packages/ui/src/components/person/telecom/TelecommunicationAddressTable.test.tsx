import { describe, expect, it } from "vitest";
import { renderComponent } from "@/test-utils";
import { TelecommunicationAddressTable } from "./TelecommunicationAddressTable";

describe("TelecommunicationAddressTable", () => {
  it("matches snapshot", () => {
    const { asFragment } = renderComponent(
      <TelecommunicationAddressTable
        telecom_addresses={[
          {
            id: "1",
            label: "ftp Pizza",
          },
          {
            id: "2",
            label: "http Pineapple",
          },
        ]}
        personId="1"
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
