import { type UseMutationResult } from "@tanstack/react-query";
import {
  type TelecommunicationAddress,
  type TelecommunicationAddressData,
} from "api-ts";
import { describe, expect, it, vi } from "vitest";
import { renderComponent } from "@/test-utils";
import { TelecommunicationAddressForm } from "./TelecommunicationAddressForm";

describe("TelecommunicationAddressForm", () => {
  it("matches snapshot", () => {
    const initialValues: TelecommunicationAddressData = {
      address: "Pizza",
      scheme: "ftp",
      use: "H",
    };
    const result = {
      id: "1",
      label: "ftp Pizza",
      ...initialValues,
    };
    const mockMutation: UseMutationResult<
      TelecommunicationAddress,
      Error,
      TelecommunicationAddressData,
      unknown
    > = {
      data: result,
      error: null,
      isError: false,
      isIdle: false,
      isPending: false,
      isPaused: false,
      isSuccess: true,
      failureCount: 0,
      failureReason: null,
      mutate: vi.fn(),
      mutateAsync: vi.fn(),
      reset: vi.fn(),
      submittedAt: 0,
      variables: {},
      status: "success",
      context: {},
    };

    const { asFragment } = renderComponent(
      <TelecommunicationAddressForm
        mutation={mockMutation}
        initialValues={initialValues}
        onCancel={() => {}}
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
