import {
  Alert,
  Box,
  Button,
  Grid,
  Group,
  LoadingOverlay,
  Stack,
  Title,
} from "@mantine/core";
import {
  queryOptions,
  useMutation,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  instanceOfPerformedObservation,
  instanceOfPerformedSpecimenCollection,
  type PerformedActivityUnionData,
} from "api-ts";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import api from "@/api";
import { ActivityForm } from "@/components/activity/ActivityForm";
import useForm from "@/components/activity/useForm";
import BackButton from "@/components/BackButton";
import { Route as SpacesSpaceIdSubjectsSubjectIdRoute } from "@/routes/spaces/$spaceId/subjects/$subjectId";

export const Route = createFileRoute(
  "/spaces/$spaceId/subjects/$subjectId/activities/$aId/edit"
)({
  component: ActivityEditRoute,
  beforeLoad: ({ params }) => ({
    breadcrumb: () => i18next.t("ActivityEditPage.breadcrumb"),
    editActivityQuery: queryOptions({
      queryKey: ["subject", params.subjectId, "activity", params.aId],
      queryFn: async () => {
        const performedActivity = await api.getSpaceSubjectPerformedActivity({
          spaceId: params.spaceId,
          subjectId: params.subjectId,
          aId: params.aId,
          result: true,
        });
        const definedActivity = performedActivity.instantiatedDefinedActivity
          ? await api.getDefinedActivity({
              aId: performedActivity.instantiatedDefinedActivity.id,
              result: true,
            })
          : null;
        return { performedActivity, definedActivity };
      },
    }),
  }),
  loader: async ({ context: { editActivityQuery, queryClient } }) =>
    await queryClient.fetchQuery(editActivityQuery),
});

function ActivityEditRoute() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { editActivityQuery, subjectQuery } = Route.useRouteContext();
  const {
    data: { definedActivity, performedActivity },
  } = useSuspenseQuery(editActivityQuery);
  const { data: subject } = useSuspenseQuery(subjectQuery);
  const { spaceId, subjectId, aId } = Route.useParams();
  const form = useForm<PerformedActivityUnionData>({
    reasonCode: performedActivity.reasonCode,
    comment: performedActivity.comment,
    dateRange: performedActivity.dateRange,
    negationIndicator: performedActivity.negationIndicator,
    negationReason: performedActivity.negationReason,
    statusCode: performedActivity.statusCode,
    statusDate: performedActivity.statusDate,
    contextForStudySiteId: performedActivity.contextForStudySite?.id || null,
    containingEpochId: performedActivity.containingEpoch?.id || null,
    instantiatedDefinedActivityId: definedActivity?.id || null,
    resultedPerformedObservationResult: instanceOfPerformedObservation(
      performedActivity
    )
      ? performedActivity.resultedPerformedObservationResult
      : undefined,
    producedSpecimen: instanceOfPerformedSpecimenCollection(performedActivity)
      ? performedActivity.producedSpecimen
      : undefined,
  });
  const mutation = useMutation({
    mutationKey: ["subject", subjectId, "activity", aId],
    mutationFn: (data: PerformedActivityUnionData) =>
      api.updateSpaceSubjectPerformedActivity({
        spaceId,
        subjectId,
        aId,
        performedActivityUnionData: data,
      }),
    onSuccess: () =>
      navigate({
        to: SpacesSpaceIdSubjectsSubjectIdRoute.to,
        params: { spaceId, subjectId },
      }),
  });

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
      <Box pos="relative">
        {mutation.isError && (
          <Alert color="red">{mutation.error.message}</Alert>
        )}
        <LoadingOverlay visible={mutation.isPending} />
        <form onSubmit={form.handleSubmit(mutation.mutate)}>
          <Grid>
            <Grid.Col span={{ base: 12, xs: 6, md: 6, lg: 6 }}>
              <ActivityForm
                spaceId={spaceId}
                definedActivity={definedActivity}
                performedActivity={form.state}
                onChange={form.onChange}
              />
            </Grid.Col>
            <Grid.Col>
              <Group>
                <BackButton variant="outline" color="grey">
                  {t("cancel")}
                </BackButton>
                <Button type="submit">{t("submit")}</Button>
              </Group>
            </Grid.Col>
          </Grid>
        </form>
      </Box>
    </Stack>
  );
}
