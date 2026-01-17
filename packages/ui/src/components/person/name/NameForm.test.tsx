import type { BiologicEntityName, BiologicEntityNameData } from "@bridg/api-ts";
import { type UseMutationResult } from "@tanstack/react-query";
import { describe, expect, it, vi } from "vitest";
import { renderComponent } from "@/test-utils";
import { NameForm } from "./NameForm";

describe("NameForm", () => {
  it("matches snapshot", () => {
    const initialValues: BiologicEntityNameData = {
      family: "Moly",
      given: "Holy",
    };
    const result = {
      id: "1",
      label: "Holy Moly",
      ...initialValues,
    };
    const mockMutation: UseMutationResult<
      BiologicEntityName,
      Error,
      BiologicEntityNameData,
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
      <NameForm
        mutation={mockMutation}
        initialValues={initialValues}
        onCancel={() => {}}
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
