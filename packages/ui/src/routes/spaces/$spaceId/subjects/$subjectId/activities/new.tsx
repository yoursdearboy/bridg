import { Button, Grid, Group, Stack, Title } from "@mantine/core";
import {
  queryOptions,
  useMutation,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import type { PerformedActivityUnion } from "api-ts";
import i18next from "i18next";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import api from "@/api";
import { ActivityForm } from "@/components/activity/ActivityForm";
import { Route as SpacesSpaceIdSubjectsSubjectIdRoute } from "@/routes/spaces/$spaceId/subjects/$subjectId";

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
  const navigate = useNavigate();
  const { subjectQuery, activityQuery } = Route.useRouteContext();
  const { data: definedActivity } = useSuspenseQuery(activityQuery);
  const performedActivity = {
    id: crypto.randomUUID(),
    reasonCode: null,
    statusCode: null,
    statusDate: null,
    contextForStudySite: null,
    containingEpoch: null,
    instantiatedDefinedActivity: definedActivity,
    resultedPerformedObservationResult: [],
  };
  const { data: subject } = useSuspenseQuery(subjectQuery);
  const { spaceId, subjectId } = Route.useParams();
  const mutation = useMutation({
    mutationFn: (performedActivity: PerformedActivityUnion) =>
      api.subjects.createSpacesSpaceIdSubjectsSubjectIdActivityPost({
        spaceId,
        subjectId,
        performedActivityUnionData: {
          ...performedActivity,
          reasonCode: null,
          statusCode: null,
          statusDate: null,
          contextForStudySiteId: null,
          containingEpochId: null,
          instantiatedDefinedActivityId: definedActivity.id,
        },
      }),
    onSuccess: () =>
      navigate({
        to: SpacesSpaceIdSubjectsSubjectIdRoute.to,
        params: { spaceId, subjectId },
      }),
  });
  const { t } = useTranslation();
  const [activity, setActivity] =
    useState<PerformedActivityUnion>(performedActivity);

  return (
    <Stack gap="md">
      <Group justify="space-between">
        <Title order={2} fw={500}>
          {subject.performingBiologicEntity?.primaryName?.label ||
            t("StudySubject.defaultLabel")}
        </Title>
        <Button type="submit" onClick={() => mutation.mutate(activity)}>
          {t("submit")}
        </Button>
      </Group>
      <Grid>
        <Grid.Col span={{ base: 12, xs: 6, md: 6, lg: 6 }}>
          <ActivityForm
            definedActivity={definedActivity}
            performedActivity={activity}
            onChange={setActivity}
          />
        </Grid.Col>
      </Grid>
    </Stack>
  );
}
