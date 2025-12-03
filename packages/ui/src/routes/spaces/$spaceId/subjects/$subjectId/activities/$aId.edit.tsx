import { Button, Grid, Group, Stack, Title } from "@mantine/core";
import {
  queryOptions,
  useMutation,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import type {
  PerformedActivityUnion,
  PerformedActivityUnionData,
} from "api-ts";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import api from "@/api";
import { ActivityFormWrapper } from "@/components/activity/ActivityFormWrapper";
import { Route as SpacesSpaceIdSubjectsSubjectIdRoute } from "@/routes/spaces/$spaceId/subjects/$subjectId";
import useActivityForm from "@/components/activity/useActivityForm";

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
  const navigate = useNavigate();
  const { activityQuery, subjectQuery } = Route.useRouteContext();
  const {
    data: { definedActivity, performedActivity },
  } = useSuspenseQuery(activityQuery);
  const { data: subject } = useSuspenseQuery(subjectQuery);
  const { spaceId, subjectId, aId } = Route.useParams();
  const form = useActivityForm(performedActivity);
  const mutation = useMutation({
    mutationKey: ["subject", subjectId, "activity", aId],
    // FIXME: replace with PerformedActivityUnionData
    mutationFn: (data: PerformedActivityUnion) =>
      api.subjects.updateSpacesSpaceIdSubjectsSubjectIdActivityAIdPatch({
        spaceId,
        subjectId,
        aId,
        performedActivityUnionData: {
          ...data,
          reasonCode: performedActivity.reasonCode,
          statusCode: performedActivity.statusCode,
          statusDate: performedActivity.statusDate,
          contextForStudySiteId:
            performedActivity.contextForStudySite?.id || null,
          containingEpochId: performedActivity.containingEpoch?.id || null,
          instantiatedDefinedActivityId:
            performedActivity.instantiatedDefinedActivity?.id || null,
        },
      }),
    onSuccess: () =>
      navigate({
        to: SpacesSpaceIdSubjectsSubjectIdRoute.to,
        params: { spaceId, subjectId },
      }),
  });
  const { t } = useTranslation();

  return (
    <Stack gap="md">
      <Group justify="space-between">
        <Title order={2} fw={500}>
          {subject.performingBiologicEntity?.primaryName?.label ||
            t("StudySubject.defaultLabel")}
        </Title>
        <Button
          type="submit"
          loading={mutation.isPending}
          onClick={form.handleSubmit(mutation.mutate)}
        >
          {t("submit")}
        </Button>
      </Group>
      <form onSubmit={form.handleSubmit(mutation.mutate)}>
        <Grid>
          <Grid.Col span={{ base: 12, xs: 6, md: 6, lg: 6 }}>
            <ActivityFormWrapper
              definedActivity={definedActivity}
              performedActivity={performedActivity}
              {...form}
            />
          </Grid.Col>
        </Grid>
      </form>
    </Stack>
  );
}
