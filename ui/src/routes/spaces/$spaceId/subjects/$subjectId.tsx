// src/routes/spaces/$spaceId/subjects/$subjectId.tsx
import api from "@/api";

import ButtonLink from "@/components/ButtonLink";
import { PatientCard } from "@/components/PatientCard";
import { SubjectInfoCard } from "@/components/SubjectInfoCard";
import { Grid, Group, Stack, Title } from "@mantine/core";
import { createFileRoute } from "@tanstack/react-router";
import type { StudySubject } from "bridg-ts";

export const Route = createFileRoute("/spaces/$spaceId/subjects/$subjectId")({
  component: RouteComponent,
  loader: ({ params }) =>
    api.subjects.showSpacesSpaceIdSubjectsSubjectIdGet(params),
  beforeLoad: () => ({
    breadcrumb: ({ loaderData: subject }: { loaderData: StudySubject }) =>
      subject.performingBiologicEntity?.primaryName || "Anonymous subject",
  }),
});

function RouteComponent() {
  const { spaceId, subjectId } = Route.useParams();
  const subject = Route.useLoaderData();

  const handleEditSubject = () => {
    // Navigation will be handled by the SubjectInfoCard's built-in link
    console.log("Edit subject:", subjectId);
  };

  const handleEditPatient = () => {
    // Navigation will be handled by the PatientCard's built-in link
    console.log("Edit patient:", subject.performingBiologicEntity?.id);
  };

  return (
    <Stack gap="md">
      <Group justify="space-between">
        <Title order={2}>Patient Information</Title>
        <ButtonLink to="..">Back to List</ButtonLink>
      </Group>

      <Grid>
        {/* Patient Card (only shown for biologic entities) */}
        {subject.performingBiologicEntity && (
          <Grid.Col span={{ base: 12, md: 6 }}>
            <PatientCard
              subject={subject}
              onEdit={handleEditPatient}
              spaceId={spaceId}
              subjectId={subjectId}
            />
          </Grid.Col>
        )}

        {/* Subject Info Card (always shown) */}
        <Grid.Col
          span={{ base: 12, md: subject.performingBiologicEntity ? 6 : 12 }}
        >
          <SubjectInfoCard
            subject={subject}
            spaceId={spaceId}
            subjectId={subjectId}
            onEdit={handleEditSubject}
          />
        </Grid.Col>
      </Grid>
    </Stack>
  );
}
