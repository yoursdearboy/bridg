import { render, screen } from "@testing-library/react";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { expect, test } from "vitest";
import PersonEditPage from "./edit";

const DATA = {
  sex: "M",
  birth_date: "2024-05-21",
  death_date: "2024-05-21",
  death_date_estimated_indicator: true,
  death_indicator: true,
  id: 1,
  primary_name: {
    use: "string",
    family: "John",
    given: "Doe",
    middle: "",
    patronymic: "",
    prefix: "",
    suffix: "",
    id: 2,
    full: "Doe John",
  },
};

test("page renders correctly", async () => {
  const router = createMemoryRouter([{ path: "/", Component: PersonEditPage, loader: () => DATA }]);
  const tree = render(<RouterProvider router={router} />);
  await screen.findAllByText("Doe John");
  expect(tree).toMatchSnapshot();
});
