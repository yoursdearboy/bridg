import { Box, Grid, Group, Stack, Text, Title } from "@mantine/core";
import { queryOptions } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import api from "@/api";
import { ActivityForm } from "@/components/activity/ActivityForm";
import { useSuspenseQueriesCombo } from "@/useSuspenseQueriesCombo";

type SearchParams = {
  aId: string;
};

export const Route = createFileRoute(
  "/spaces/$spaceId/subjects/$subjectId/activities/new"
)({
  component: ActivityNewRoute,
  validateSearch: (search: Record<string, unknown>): SearchParams => ({
    aId: search.aId as string,
  }),
  beforeLoad: ({ params, search }) => ({
    breadcrumb: () => i18next.t("ActivityNewPage.breadcrumb"),
    activityQuery: queryOptions({
      queryKey: ["subject", params.subjectId, "activity"],
      queryFn: async () =>
        await api.definedActivity.showDefinedActivityAIdGet({
          aId: search.aId,
          result: true,
        }),
    }),
  }),
  loader: async ({ context: { activityQuery, queryClient } }) =>
    await queryClient.fetchQuery(activityQuery),
});

function ActivityNewRoute() {
  const { subjectQuery, activityQuery } = Route.useRouteContext();
  const {
    error,
    data: { subject, activity },
  } = useSuspenseQueriesCombo({
    subject: subjectQuery,
    activity: activityQuery,
  });
  const { t } = useTranslation();

  if (error)
    return (
      <Text color="red">{t("errorMessage", { error: error.message })}</Text>
    );

  return (
    <Stack gap="md">
      <Group justify="space-between">
        <Title order={2}>
          {subject.performingBiologicEntity?.primaryName?.label ||
            t("StudySubject.defaultLabel")}
          <Box display="inline" px="md">
            ({activity.nameCode.displayName || t("Activity.defaultLabel")})
          </Box>
        </Title>
      </Group>
      <Grid>
        <Grid.Col span={{ base: 12, xs: 6, md: 6, lg: 6 }}>
          <ActivityForm definedActivity={activity} />
        </Grid.Col>
      </Grid>
    </Stack>
  );
}
