import { render, screen } from "@testing-library/react";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { afterAll, afterEach, beforeAll, expect, test } from "vitest";
import { setupServer } from "msw/node";
import { HttpResponse, http } from "msw";
import routes from "../routes";

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

const server = setupServer(http.get("/api/persons/1", () => HttpResponse.json(DATA)));

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("person edit page renders correctly", async () => {
  const router = createMemoryRouter(routes, { initialEntries: ["/persons/1/edit"] });
  const tree = render(<RouterProvider router={router} />);
  await screen.findAllByText("Doe John");
  expect(tree).toMatchSnapshot();
});
