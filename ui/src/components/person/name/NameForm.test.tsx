import { describe, it, expect } from "vitest";
import { NameForm } from "./NameForm";
import { renderComponent } from "@/test-utils";
import type { EntityNameData } from "bridg-ts";

describe("NameForm", () => {
  it("matches snapshot", () => {
    const initialValues: EntityNameData = {
      family: "Moly",
      given: "Holy",
    };

    const { asFragment } = renderComponent(
      <NameForm
        initialValues={initialValues}
        onClose={() => {}}
        onSubmit={() => {}}
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
