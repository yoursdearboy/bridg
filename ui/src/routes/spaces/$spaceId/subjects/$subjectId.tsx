// src/routes/spaces/$spaceId/subjects/$subjectId.tsx
import api from "@/api";
import ButtonLink from "@/components/ButtonLink";
import { PatientCard } from "@/components/PatientCard";
import { SubjectInfoCard } from "@/components/SubjectInfoCard";
import { Badge, Grid, Group, Stack, Title } from "@mantine/core";
import { createFileRoute, Link } from "@tanstack/react-router";
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
  const { spaceId, subjectId } = Route.useParams();
  const subject = Route.useLoaderData();
  const { t } = useTranslation();
  const personId = subject.performingBiologicEntity?.id;

  const handleEditSubject = () => {
    console.log("Edit subject:", subjectId);
  };

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
            <PatientCard
              subject={subject}
              editLink={
                <Link
                  to="/spaces/$spaceId/subjects/edit"
                  params={{ spaceId }}
                  search={{ personId }}
                >
                  <Badge color="blue" style={{ cursor: "pointer" }}>
                    {t("Edit")}
                  </Badge>
                </Link>
              }
            />
          </Grid.Col>
        )}

        <Grid.Col
          span={{ base: 12, md: subject.performingBiologicEntity ? 6 : 12 }}
        >
          <SubjectInfoCard
            subject={subject}
            spaceId={spaceId}
            onEdit={handleEditSubject}
          />
        </Grid.Col>
      </Grid>
    </Stack>
  );
}
