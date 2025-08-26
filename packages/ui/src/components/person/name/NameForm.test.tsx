import { describe, it, expect } from "vitest";
import { NameForm } from "./NameForm";
import { renderComponent } from "@/test-utils";
import type { EntityNameData } from "api-ts";

describe("NameForm", () => {
  it("matches snapshot", () => {
    const initialValues: EntityNameData = {
      family: "Moly",
      given: "Holy",
    };

    const { asFragment } = renderComponent(
      <NameForm
        personId="123"
        onSuccess={() => {}}
        initialValues={initialValues}
        onClose={() => {}}
        onSubmit={() => {}}
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
