import { render } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

import api from "@/api";
import { NameForm } from "./NameForm";

describe("NameForm", () => {
  it("matches snapshot", () => {
    vi.spyOn(api.persons, "createPersonsPersonIdNamesPost").mockResolvedValue({
      use: "official",
      family: "James",
      given: "Valya",
      middle: "Gold",
      patronymic: "Gold",
      prefix: "Ms.",
      suffix: "Jr.",
    });

    const { asFragment } = render(
      <NameForm
        personId="2703d0bc-7ed4-497c-91c6-30d86a8eb630"
        onClose={() => {}}
        onSuccess={() => {}}
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
