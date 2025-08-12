// src/routes/spaces/$spaceId/subjects/$subjectId.tsx
import api from "@/api";
import ButtonLink from "@/components/ButtonLink";
import { PersonCard } from "@/components/person/PersonCard";
import { Grid, Group, Stack, Title } from "@mantine/core";
import { createFileRoute } from "@tanstack/react-router";
import type { StudySubject } from "bridg-ts";
import { useTranslation } from "react-i18next";

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
  const subject = Route.useLoaderData();
  const { t } = useTranslation();

  return (
    <Stack gap="md">
      <Group justify="space-between">
        <Title order={2}>{t("Patient Information")}</Title>
        <ButtonLink to="..">Back to List</ButtonLink>
      </Group>

      <Grid>
        {/* Patient Card (only shown for biologic entities) */}
        {subject.performingBiologicEntity && (
          <Grid.Col span={{ base: 12, md: 6 }}>
            <PersonCard person={subject.performingBiologicEntity} />
          </Grid.Col>
        )}
      </Grid>
    </Stack>
  );
}
