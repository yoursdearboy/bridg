import { render, screen } from "@testing-library/react";
import { HttpResponse, http } from "msw";
import { setupServer } from "msw/node";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { afterAll, afterEach, beforeAll, expect, test } from "vitest";
import routes from "../../../routes";

const URL = "/persons/1/name/2/edit";

const PERSON = {
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

const NAME = {
  use: "string",
  family: "John",
  given: "Doe",
  middle: "",
  patronymic: "",
  prefix: "",
  suffix: "",
  id: 2,
  full: "Doe John",
};

const server = setupServer(
  http.get("/api/persons/1", () => HttpResponse.json(PERSON)),
  http.get("/api/persons/1/names/2", () => HttpResponse.json(NAME))
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("person's name edit page renders correctly", async () => {
  const router = createMemoryRouter(routes, { initialEntries: [URL] });
  const tree = render(<RouterProvider router={router} />);
  await screen.findAllByText("Doe John");
  expect(tree).toMatchSnapshot();
});
