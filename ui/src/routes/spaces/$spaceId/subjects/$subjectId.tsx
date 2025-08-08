// src/routes/spaces/$spaceId/subjects/$subjectId.tsx
import api from "@/api";
import ButtonLink from "@/components/ButtonLink";
import { PatientCard } from "@/components/PatientCard";
import { SubjectInfoCard } from "@/components/SubjectInfoCard";
import { Grid, Group, Stack, Title } from "@mantine/core";
import { createFileRoute, Outlet } from "@tanstack/react-router";
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
// src/routes/spaces/$spaceId/subjects/$subjectId.tsx
function RouteComponent() {
  const { spaceId } = Route.useParams(); // Получаем оба параметра
  const subject = Route.useLoaderData();
  const { t } = useTranslation();

  return (
    <Stack gap="md">
      <Group justify="space-between">
        <Title order={2}>{t("Patient Information")}</Title>
        <ButtonLink to="..">Back to List</ButtonLink>
      </Group>

      <Grid>
        {subject.performingBiologicEntity && (
          <Grid.Col span={{ base: 12, md: 6 }}>
            <PatientCard
              subject={subject}
              spaceId={spaceId} // Передаем spaceId в PatientCard
            />
          </Grid.Col>
        )}

        <Grid.Col
          span={{ base: 12, md: subject.performingBiologicEntity ? 6 : 12 }}
        >
          <SubjectInfoCard subject={subject} spaceId={spaceId} />
        </Grid.Col>
      </Grid>

      <Outlet />
    </Stack>
  );
}
