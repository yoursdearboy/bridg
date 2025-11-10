import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/spaces/$spaceId/subjects/$subjectId/activities"
)({
  component: RouteComponent,
  beforeLoad: () => ({
    breadcrumb: null,
  }),
});

function RouteComponent() {
  return <Outlet />;
}
