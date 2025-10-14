import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/spaces/$spaceId/subjects/$subjectId/activities"
)({
  component: RouteComponent,
  beforeLoad: () => ({
    breadcrumb: null,
  }),
});

function RouteComponent() {
  return <div>Hello "/spaces/$spaceId/subjects/$subjectId/activities/"!</div>;
}
