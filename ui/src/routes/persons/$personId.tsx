import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/persons/$personId")({
  component: PersonLayout,
});

function PersonLayout() {
  return <Outlet />;
}
