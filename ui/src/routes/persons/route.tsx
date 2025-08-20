import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/persons")({
  beforeLoad: () => ({
    breadcrumb: "Persons",
  }),
});
