import { Box, Grid, Group, Stack, Title } from "@mantine/core";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import api from "@/api";
import { ActivityForm } from "@/components/activity/ActivityForm";

export const Route = createFileRoute(
  "/spaces/$spaceId/subjects/$subjectId/activities/$aId/edit"
)({
  component: ActivityEditRoute,
  beforeLoad: ({ params }) => ({
    breadcrumb: () => i18next.t("ActivityEditPage.breadcrumb"),
    activityQuery: queryOptions({
      queryKey: ["subject", params.subjectId, "activity", params.aId],
      queryFn: async () => {
        const performedActivity =
          await api.subjects.showSpacesSpaceIdSubjectsSubjectIdActivityAIdGet({
            spaceId: params.spaceId,
            subjectId: params.subjectId,
            aId: params.aId,
            result: true,
          });
        const definedActivity =
          await api.definedActivity.showDefinedActivityAIdGet({
            aId: performedActivity.instantiatedDefinedActivity!.id,
            result: true,
          });
        return { performedActivity, definedActivity };
      },
    }),
  }),
  loader: async ({ context: { activityQuery, queryClient } }) =>
    await queryClient.fetchQuery(activityQuery),
});

function ActivityEditRoute() {
  const { activityQuery, subjectQuery } = Route.useRouteContext();
  const {
    data: { definedActivity, performedActivity },
  } = useSuspenseQuery(activityQuery);
  const { data: subject } = useSuspenseQuery(subjectQuery);
  const { t } = useTranslation();

  return (
    <Stack gap="md">
      <Group justify="space-between">
        <Title order={2} fw={500}>
          {subject.performingBiologicEntity?.primaryName?.label ||
            t("StudySubject.defaultLabel")}
        </Title>
      </Group>
      <Grid>
        <Grid.Col span={{ base: 12, xs: 6, md: 6, lg: 6 }}>
          <ActivityForm
            definedActivity={definedActivity}
            performedActivity={performedActivity}
          />
        </Grid.Col>
      </Grid>
    </Stack>
  );
}
