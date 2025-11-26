import { Grid, Group, Stack, Text, Title } from "@mantine/core";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import api from "@/api";
import { ActivityForm } from "@/components/activity/ActivityForm";

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
    query: queryOptions({
      queryKey: ["subject", params.subjectId, "activity"],
      queryFn: async () =>
        await api.definedActivity.showDefinedActivityAIdGet({
          aId: search.aId,
          result: true,
        }),
    }),
  }),
  loader: async ({ context: { query, queryClient } }) =>
    await queryClient.fetchQuery(query),
});

function ActivityNewRoute() {
  const { query } = Route.useRouteContext();
  const { isError, error, data: activity } = useSuspenseQuery(query);
  const { t } = useTranslation();

  if (isError)
    return (
      <Text color="red">{t("errorMessage", { error: error.message })}</Text>
    );

  return (
    <Stack gap="md">
      <Group justify="space-between">
        <Title order={2}>
          {activity.nameCode.displayName || t("Activity.defaultLabel")}
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
