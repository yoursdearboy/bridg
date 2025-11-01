import { Card, Grid, Group, Stack, Title } from "@mantine/core";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import type {
  DefinedObservationResult,
  PerformedObservationResult,
  StudyActivity,
} from "api-ts";
import api from "@/api";
import { ActivityFormWrapper } from "@/components/activity/ActivityForm";
import i18next from "@/i18n";

type SearchParams = {
  saId: string;
};

export const Route = createFileRoute(
  "/spaces/$spaceId/subjects/$subjectId/activities/new"
)({
  component: NewActivityComponent,
  validateSearch: (search: Record<string, unknown>): SearchParams => ({
    saId: search.saId as string,
  }),
  beforeLoad: ({ params, search }) => ({
    breadcrumb: ({
      loaderData: { activity },
    }: {
      loaderData: { activity: StudyActivity };
    }) =>
      activity.usedDefinedActivity.nameCode.displayName ||
      i18next.t("NewActivityRoute.breadcrumbDefault"),
    query: queryOptions({
      queryKey: ["subject", params.subjectId, "activity"],
      queryFn: async () => {
        const activity =
          await api.spaceActivity.showSpacesSpaceIdActivitySaIdGet({
            spaceId: params.spaceId,
            saId: search.saId,
          });
        const results =
          await api.spaceActivity.indexSpacesSpaceIdActivityObsIdResultGet({
            spaceId: params.spaceId,
            obsId: activity.id,
          });
        return {
          activity,
          results,
        };
      },
    }),
  }),
  loader: async ({ context: { query, queryClient } }) =>
    await queryClient.fetchQuery(query),
});

const definedResultToPerformedResult = (
  result: DefinedObservationResult
): PerformedObservationResult => {
  return {
    ...result,
    id: self.crypto.randomUUID(),
    valueNullFlavorReason: null,
    baselineIndicator: null,
    derivedIndicator: null,
    createdDate: null,
    reportedDate: null,
    comment: null,
  };
};

function NewActivityComponent() {
  const { query } = Route.useRouteContext();
  const {
    data: { activity, results: definedResults },
  } = useSuspenseQuery(query);
  const { spaceId, subjectId } = Route.useParams();

  const performedResults = definedResults.map(definedResultToPerformedResult);

  return (
    <Stack gap="md">
      <Group justify="space-between">
        <Title order={2}>
          {activity.usedDefinedActivity.nameCode.displayName}
        </Title>
      </Group>

      <Grid>
        <Grid.Col span={{ base: 12, xs: 8, md: 4, lg: 3 }}>
          <Card>
            <ActivityFormWrapper
              spaceId={spaceId}
              subjectId={subjectId}
              results={performedResults}
            />
          </Card>
        </Grid.Col>
      </Grid>
    </Stack>
  );
}
