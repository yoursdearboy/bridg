import {
  Card,
  Grid,
  Group,
  LoadingOverlay,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import {
  queryOptions,
  useQuery,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { type DefinedActivity, type PerformedObservation } from "api-ts";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import api from "@/api";
import { ActivityFormWrapper } from "@/components/activity/ActivityForm";

export const Route = createFileRoute(
  "/spaces/$spaceId/subjects/$subjectId/activities/$obsId/edit"
)({
  component: EditObservationComponent,
  beforeLoad: ({ params }) => ({
    breadcrumb: () => i18next.t("EditActivityRoute.defaultBreadcrumb"),
    query: queryOptions({
      queryKey: ["subjects", params.subjectId, "activity", params.obsId],
      queryFn: async () =>
        await api.subjects.showSpacesSpaceIdSubjectsSubjectIdActivityAIdGet({
          spaceId: params.spaceId,
          subjectId: params.subjectId,
          aId: params.obsId,
          result: true,
        }),
    }),
  }),
  loader: async ({ context: { query, queryClient } }) =>
    await queryClient.fetchQuery(query),
});

function EditObservationComponent() {
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
          {/* TODO: replace with function */}
          {activity.resultedPerformedObservationResult ? (
            <EditObservationWrapper
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

interface EditObservationWrapperProps {
  spaceId: string;
  subjectId: string;
  activity: PerformedObservation;
  definedActivity: DefinedActivity;
}

const EditObservationWrapper = ({
  spaceId,
  subjectId,
  activity,
}: EditObservationWrapperProps) => {
  const { t } = useTranslation();
  const {
    data: definedActivityRecord,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["subject", subjectId, "activity"],
    queryFn: () =>
      api.definedActivity.showDefinedActivityAIdGet({
        aId: activity.instantiatedDefinedActivity!.id,
        result: true,
      }),
  });
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
            <>
              <LoadingOverlay visible={isPending} />
              {isError && (
                <Text color="red">
                  {t("errorMessage", { error: error.message })}
                </Text>
              )}
              {!isError && (
                <Card shadow="sm" padding="lg" radius="md" withBorder>
                  {/* TODO: replace with function */}
                  {definedActivityRecord?.producedDefinedObservationResult ? (
                    <ActivityFormWrapper
                      spaceId={spaceId}
                      subjectId={subjectId}
                      performedResults={
                        activity.resultedPerformedObservationResult
                      }
                      definedResults={
                        definedActivityRecord.producedDefinedObservationResult
                      }
                    />
                  ) : null}
                </Card>
              )}
            </>
          </Card>
        </Grid.Col>
      </Grid>
    </Stack>
  );
};
