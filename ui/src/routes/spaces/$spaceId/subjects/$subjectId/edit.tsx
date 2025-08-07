// src/routes/spaces/$spaceId/subjects/$subjectId.edit.tsx
import { createFileRoute } from "@tanstack/react-router";
import { Text } from "@mantine/core";

export const Route = createFileRoute(
  "/spaces/$spaceId/subjects/$subjectId/edit"
)({
  component: EditComponent,
  beforeLoad: () => ({
    breadcrumb: "Edit Patient",
  }),
});

function EditComponent() {
  return <Text>Edit Patient </Text>;
}
