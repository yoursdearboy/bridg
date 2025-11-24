import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/spaces/$spaceId/subjects/$subjectId/activities"
)({
  beforeLoad: () => ({
    breadcrumb: null,
  }),
});
