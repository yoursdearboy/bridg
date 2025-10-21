import { Card, Group, Stack, Title } from "@mantine/core";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import type { DefinedObservationResult, StudyActivity } from "api-ts";
import api from "@/api";
import { ActivityFormWrapper } from "@/components/activity/ActivityForm";
import { defined2performedResult } from "@/components/activity/helpers/defined2performedResult";
import i18next from "@/i18n";

type SearchParams = {
  saId: string;
};

export const Route = createFileRoute(
  "/spaces/$spaceId/subjects/$subjectId/activities/new"
)({
  component: NewActivityComponent,
  validateSearch: (search: Record<string, unknown>): SearchParams => {
    return {
      saId: search.saId as string,
    };
  },
  beforeLoad: ({ params, search }) => ({
    breadcrumb: ({
      loaderData: { activity },
    }: {
      loaderData: { activity: StudyActivity };
    }) =>
      activity.usedDefinedActivity.nameCode.displayName ||
      i18next.t("NewActivityRoute.breadcrumbDefault"),
    query: queryOptions({
      queryKey: ["subject", params.subjectId, "activity", "new"],
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

function NewActivityComponent() {
  const { query } = Route.useRouteContext();
  const {
    data: { activity, results },
  } = useSuspenseQuery(query);
  const { spaceId, subjectId } = Route.useParams();

  return (
    <Stack gap="md">
      <Group justify="space-between">
        <Title order={2}>
          {activity.usedDefinedActivity.nameCode.displayName}
        </Title>
      </Group>

      <Card>
        <ActivityFormWrapperT
          spaceId={spaceId}
          subjectId={subjectId}
          results={results}
        />
      </Card>
    </Stack>
  );
}

interface ActivityFormWrapperTProps {
  spaceId: string;
  subjectId: string;
  results: DefinedObservationResult[];
}

const ActivityFormWrapperT = ({
  spaceId,
  subjectId,
  results,
}: ActivityFormWrapperTProps) => {
  const performedResults = results.map((result) =>
    defined2performedResult(result)
  );

  return (
    <ActivityFormWrapper
      spaceId={spaceId}
      subjectId={subjectId}
      results={performedResults}
    />
  );
};
