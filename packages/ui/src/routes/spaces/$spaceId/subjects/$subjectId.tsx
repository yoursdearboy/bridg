import api from "@/api";
import ButtonLink from "@/components/ButtonLink";
import { PersonCard } from "@/components/person/PersonCard";
import { Grid, Group, Stack, Title } from "@mantine/core";
import { createFileRoute } from "@tanstack/react-router";
import type { StudySubject } from "api-ts";
import { useTranslation } from "react-i18next";
import { Route as personRoute } from "@/routes/persons/$personId";
import i18next from "../../../../i18n";

export const Route = createFileRoute("/spaces/$spaceId/subjects/$subjectId")({
  component: SubjectShowPage,
  loader: ({ params }) =>
    api.subjects.showSpacesSpaceIdSubjectsSubjectIdGet(params),
  beforeLoad: () => ({
    breadcrumb: ({ loaderData: subject }: { loaderData: StudySubject }) =>
      subject.performingBiologicEntity?.primaryName?.label || i18next.t("SubjectShowPage.breadcrumbDefault"),
  }),
});

function SubjectShowPage() {
  const subject = Route.useLoaderData();
  const { t } = useTranslation();

  return (
    <Stack gap="md">
      <Group justify="space-between">
        <Title order={2}>{t("SubjectShowPage.title")}</Title>
        <ButtonLink to="..">{t("SubjectShowPage.back")}</ButtonLink>
      </Group>

      <Grid>
        {subject.performingBiologicEntity && (
          <Grid.Col span={{ base: 12, md: 6 }}>
            <PersonCard person={subject.performingBiologicEntity} />
            <ButtonLink
              mt="md"
              to={personRoute.to}
              params={{ personId: subject.performingBiologicEntity.id }}
              variant="light"
            >
              {t("SubjectShowPage.toPerson")}
            </ButtonLink>
          </Grid.Col>
        )}
      </Grid>
    </Stack>
  );
}
