import { Grid, Group, Stack, Title } from "@mantine/core";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { type StudySubject } from "api-ts";
import { useTranslation } from "react-i18next";
import api from "@/api";
import { ActivityCard } from "@/components/activity/ActivityCard";
import ButtonLink from "@/components/ButtonLink";
import { PersonCard } from "@/components/person/PersonCard";
import { SpaceRedirection } from "@/components/subject/SpaceRedirection";
import { StatusCard } from "@/components/subject/StatusCard";
import i18next from "@/i18n";

export const Route = createFileRoute("/spaces/$spaceId/subjects/$subjectId/")({
  component: SubjectShowPage,
  beforeLoad: ({ params }) => ({
    breadcrumb: ({ loaderData: subject }: { loaderData: StudySubject }) =>
      subject.performingBiologicEntity?.primaryName?.label ||
      i18next.t("SubjectShowPage.breadcrumbDefault"),
    query: queryOptions({
      queryKey: ["subject", params.subjectId],
      queryFn: () => api.subjects.showSpacesSpaceIdSubjectsSubjectIdGet(params),
    }),
  }),
  loader: ({ context: { query, queryClient } }) =>
    queryClient.fetchQuery(query),
});

function SubjectShowPage() {
  const { query } = Route.useRouteContext();
  const { data: subject } = useSuspenseQuery(query);
  const { t } = useTranslation();
  const { spaceId, subjectId } = Route.useParams();

  return (
    <Stack gap="md">
      <Group justify="space-between">
        <Group>
          <Title order={2} fw={500}>
            {subject.performingBiologicEntity?.primaryName?.label ||
              t("StudySubject.defaultLabel")}
          </Title>
          <StatusCard
            spaceId={spaceId}
            subjectId={subjectId}
            subject={subject}
          ></StatusCard>
          <SpaceRedirection subject={subject} status={subject.status!} />
        </Group>
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
