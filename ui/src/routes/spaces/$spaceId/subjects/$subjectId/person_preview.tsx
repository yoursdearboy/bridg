import { createFileRoute } from "@tanstack/react-router";
import { PatientCard } from "@/components/PatientCard";
import { Stack, Text } from "@mantine/core";
import api from "@/api";

export const Route = createFileRoute(
  "/spaces/$spaceId/subjects/$subjectId/person_preview"
)({
  component: EditComponent,
  loader: ({ params }) =>
    api.subjects.showSpacesSpaceIdSubjectsSubjectIdGet(params),
});

function EditComponent() {
  const { spaceId, subjectId } = Route.useParams();
  const subject = Route.useLoaderData();

  return (
    <Stack>
      <PatientCard subject={subject} />
      <Text>
        Editing subject {subjectId} in space {spaceId}
      </Text>
    </Stack>
  );
}
