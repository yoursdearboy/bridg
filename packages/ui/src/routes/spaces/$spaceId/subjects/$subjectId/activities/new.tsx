import { Card, Group, LoadingOverlay, Stack, Text, Title } from "@mantine/core";
import {
  queryOptions,
  useQuery,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import type { DefinedObservationResult, StudyActivity } from "api-ts";
import { t } from "i18next";
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
    breadcrumb: ({ loaderData: activity }: { loaderData: StudyActivity }) =>
      activity.usedDefinedActivity.nameCode.displayName ||
      i18next.t("NewActivityRoute.breadcrumbDefault"),
    query: queryOptions({
      queryKey: ["subject", params.subjectId, "activity", "new"],
      queryFn: () =>
        api.spaceActivity.showSpacesSpaceIdActivitySaIdGet({
          spaceId: params.spaceId,
          saId: search.saId,
        }),
    }),
  }),
  loader: async ({ context: { query, queryClient } }) =>
    await queryClient.fetchQuery(query),
});

function NewActivityComponent() {
  const { query } = Route.useRouteContext();
  const { data: activity } = useSuspenseQuery(query);
  const { spaceId, subjectId } = Route.useParams();
  const resultsQuery = useQuery({
    queryKey: ["subjects", subjectId, "activities", activity.id, "result"],
    queryFn: () =>
      api.spaceActivity.indexSpacesSpaceIdActivityObsIdResultGet({
        spaceId,
        obsId: activity.id,
      }),
  });
  const { isPending, isError, error, data: results } = resultsQuery;

  return (
    <Stack gap="md">
      <Group justify="space-between">
        <Title order={2}>
          {activity.usedDefinedActivity.nameCode.displayName}
        </Title>
      </Group>

      <Card>
        <LoadingOverlay visible={isPending} />
        {isError && (
          <Text color="red">{t("errorMessage", { error: error.message })}</Text>
        )}
        {!isPending && !isError && (
          <ActivityFormWrapperT
            spaceId={spaceId}
            subjectId={subjectId}
            results={results}
          />
        )}
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
