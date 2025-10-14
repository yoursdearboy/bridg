import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/spaces/$spaceId/subjects/$subjectId")({
  beforeLoad: () => ({
    breadcrumb: () => "Subject",
  }),
});
