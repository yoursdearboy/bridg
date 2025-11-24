import { Grid, Group, Stack, Title } from "@mantine/core";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { ActivityCard } from "@/components/activity/ActivityCard";
import ButtonLink from "@/components/ButtonLink";
import { PersonCard } from "@/components/person/PersonCard";

export const Route = createFileRoute("/spaces/$spaceId/subjects/$subjectId/")({
  component: SubjectShowPage,
  beforeLoad: () => ({
    breadcrumb: null,
  }),
});

function SubjectShowPage() {
  const { query } = Route.useRouteContext();
  const { data: subject } = useSuspenseQuery(query);
  const { spaceId, subjectId } = Route.useParams();
  const { t } = useTranslation();

  return (
    <Stack gap="md">
      <Group justify="space-between">
        <Title order={2} fw={500}>
          {subject.performingBiologicEntity?.primaryName?.label ||
            t("StudySubject.defaultLabel")}
        </Title>
        <ButtonLink to="..">{t("SubjectShowPage.back")}</ButtonLink>
      </Group>

      <Grid>
        <Grid.Col span={{ base: 12, md: 6 }}>
          {subject.performingBiologicEntity && (
            <PersonCard
              person={subject.performingBiologicEntity}
              link="forward"
            />
          )}
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <ActivityCard spaceId={spaceId} subjectId={subjectId} />
        </Grid.Col>
      </Grid>
    </Stack>
  );
}
