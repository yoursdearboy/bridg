import { renderComponent } from "@/test-utils";
import type { EntityNameData } from "api-ts";
import { describe, expect, it } from "vitest";
import { NameForm } from "./NameForm";

describe("NameForm", () => {
  it("matches snapshot", () => {
    const initialValues: EntityNameData = {
      family: "Moly",
      given: "Holy",
    };
    const mockMutation = {
      isPending: false,
      error: null,
      isError: false,
    };
    const { asFragment } = renderComponent(
      <NameForm
        mutation={mockMutation}
        initialValues={initialValues}
        onClose={() => {}}
        onSubmit={() => {}}
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
