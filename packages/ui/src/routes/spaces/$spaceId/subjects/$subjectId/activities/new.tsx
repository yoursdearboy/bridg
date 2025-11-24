import { Grid, Group, Stack, Text, Title } from "@mantine/core";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import type { DefinedActivityUnion } from "api-ts";
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
  component: NewActivityComponent,
  validateSearch: (search: Record<string, unknown>): SearchParams => ({
    aId: search.aId as string,
  }),
  beforeLoad: ({ params, search }) => ({
    breadcrumb: ({ loaderData }: { loaderData: DefinedActivityUnion }) =>
      loaderData.nameCode.displayName || i18next.t("Activity.defaultLabel"),
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

function NewActivityComponent() {
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
        <Grid.Col span={{ base: 12, xs: 8, md: 4, lg: 3 }}>
          <ActivityForm definedActivity={activity} />
        </Grid.Col>
      </Grid>
    </Stack>
  );
}
