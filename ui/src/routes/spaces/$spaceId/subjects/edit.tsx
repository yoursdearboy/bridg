// src/routes/spaces/$spaceId/subjects/$subjectId/edit.tsx
import { createFileRoute } from "@tanstack/react-router";
import { Text } from "@mantine/core";

export const Route = createFileRoute("/spaces/$spaceId/subjects/edit")({
  component: EditComponent,
});

function EditComponent() {
  const { spaceId, subjectId } = Route.useParams();

  return (
    <div>
      <Text>edit space</Text>
    </div>
  );
}
