import {
  Card,
  Grid,
  Group,
  LoadingOverlay,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import {
  instanceOfDefinedObservation,
  type DefinedObservation,
  type DefinedObservationResult,
  type PerformedObservationResult,
} from "api-ts";
import { useTranslation } from "react-i18next";
import api from "@/api";
import { ActivityFormWrapper } from "@/components/activity/ActivityForm";
import i18next from "@/i18n";

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
    breadcrumb: () => i18next.t("NewActivityRoute.breadcrumbDefault"),
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
  const { isPending, isError, error, data: activity } = useSuspenseQuery(query);
  const { spaceId, subjectId } = Route.useParams();
  const { t } = useTranslation();
  return (
    <>
      <LoadingOverlay visible={isPending} />
      {isError && (
        <Text color="red">{t("errorMessage", { error: error.message })}</Text>
      )}
      {!isError && (
        <>
          {instanceOfDefinedObservation(activity) ? (
            <NewActivityWrapper
              spaceId={spaceId}
              subjectId={subjectId}
              activity={activity}
            />
          ) : null}
        </>
      )}
    </>
  );
}

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

interface NewActivityWrapperProps {
  spaceId: string;
  subjectId: string;
  activity: DefinedObservation;
}

const NewActivityWrapper = ({
  spaceId,
  subjectId,
  activity,
}: NewActivityWrapperProps) => {
  const performedResults = activity.producedDefinedObservationResult.map(
    definedResultToPerformedResult
  );
  return (
    <Stack gap="md">
      <Group justify="space-between">
        <Title order={2}>{activity.nameCode.displayName}</Title>
      </Group>

      <Grid>
        <Grid.Col span={{ base: 12, xs: 8, md: 4, lg: 3 }}>
          <Card>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <ActivityFormWrapper
                spaceId={spaceId}
                subjectId={subjectId}
                performedResults={performedResults}
                definedResults={activity.producedDefinedObservationResult}
              />
            </Card>
          </Card>
        </Grid.Col>
      </Grid>
    </Stack>
  );
};
