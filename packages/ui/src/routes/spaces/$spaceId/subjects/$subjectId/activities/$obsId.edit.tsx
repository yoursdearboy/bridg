import { Card, Grid, Group, Stack, Title } from "@mantine/core";
import { queryOptions } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import type { PerformedObservation } from "api-ts";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import api from "@/api";
import { ActivityFormWrapper } from "@/components/activity/ActivityForm";

export const Route = createFileRoute(
  "/spaces/$spaceId/subjects/$subjectId/activities/$obsId/edit"
)({
  component: EditObservationComponent,
  beforeLoad: ({ params }) => ({
    breadcrumb: ({
      loaderData: { activity },
    }: {
      loaderData: { activity: PerformedObservation };
    }) =>
      activity.instantiatedDefinedActivity?.nameCode.displayName ||
      i18next.t("EditActivityRoute.defaultBreadcrumb"),
    query: queryOptions({
      queryKey: ["subjects", params.subjectId, "activity", params.obsId],
      queryFn: async () => {
        const activity =
          await api.subjects.showSpacesSpaceIdSubjectsSubjectIdObservationObsIdGet(
            params
          );
        const results =
          await api.subjects.indexSpacesSpaceIdSubjectsSubjectIdObservationObsIdResultGet(
            {
              spaceId: params.spaceId,
              subjectId: params.subjectId,
              obsId: activity.id,
            }
          );
        return { activity, results };
      },
    }),
  }),
  loader: async ({ context: { query, queryClient } }) =>
    await queryClient.fetchQuery(query),
});

function EditObservationComponent() {
  const { activity, results } = Route.useLoaderData();
  const { spaceId, subjectId } = Route.useParams();
  const { t } = useTranslation();

  return (
    <Stack gap="md">
      <Group justify="space-between">
        <Title order={2}>
          {activity.instantiatedDefinedActivity?.nameCode.displayName ||
            t("EditActivityRoute.unnamed")}
        </Title>
      </Group>

      <Grid>
        <Grid.Col span={{ base: 12, xs: 8, md: 4, lg: 3 }}>
          <Card>
            <ActivityFormWrapper
              spaceId={spaceId}
              subjectId={subjectId}
              results={results}
            />
          </Card>
        </Grid.Col>
      </Grid>
    </Stack>
  );
}
