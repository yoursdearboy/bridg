import { type UseMutationResult } from "@tanstack/react-query";
import type { PersonPostalAddress, PersonPostalAddressData } from "api-ts";
import { describe, expect, it, vi } from "vitest";
import { renderComponent } from "@/test-utils";
import { AddressForm } from "./AddressForm";

describe("AddressForm", () => {
  it("matches snapshot", () => {
    const initialValues: PersonPostalAddressData = {
      street: "Red",
      building: "Square",
      use: "h",
    };
    const result = {
      id: "1",
      label: "Red Square",
      ...initialValues,
    };
    const mockMutation: UseMutationResult<
      PersonPostalAddress,
      Error,
      PersonPostalAddressData,
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
      <AddressForm
        mutation={mockMutation}
        initialValues={initialValues}
        onCancel={() => {}}
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
