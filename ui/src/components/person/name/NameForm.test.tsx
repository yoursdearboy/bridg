import { describe, it, expect } from "vitest";
import { NameForm } from "./NameForm";
import { renderComponent } from "@/test-utils";

describe("NameForm", () => {
  it("matches snapshot", () => {
    const { asFragment } = renderComponent(
      <NameForm
        personId="2703d0bc-7ed4-497c-91c6-30d86a8eb630"
        onClose={() => {}}
        onSuccess={() => {}}
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
