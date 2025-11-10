import { type UseMutationResult } from "@tanstack/react-query";
import type { Person, PersonData } from "api-ts";
import { describe, expect, it, vi } from "vitest";
import { renderComponent } from "@/test-utils";
import { PersonForm } from "./PersonForm";

describe("PersonForm", () => {
  it("matches snapshot", () => {
    const initialValues: PersonData = {
      administrativeGenderCode: "U",
      birthDate: new Date("1991-01-01"),
      deathDate: null,
      deathDateEstimatedIndicator: false,
      deathIndicator: false,
      primaryName: null,
    };
    const result: Person = {
      ...initialValues,
      id: "1",
      primaryName: {
        id: "9de936fd-75b4-4021-a31f-4a243033b59f",
        label: "Donald Trump Jr",
      },
    };
    const mockMutation: UseMutationResult<Person, Error, PersonData, unknown> =
      {
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
        variables: initialValues,
        status: "success",
        context: {},
      };

    const { asFragment } = renderComponent(
      <PersonForm
        mutation={mockMutation}
        initialValues={initialValues}
        onCancel={() => {}}
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
