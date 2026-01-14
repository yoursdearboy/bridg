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
import type { PerformedActivityUnionData } from "api-ts";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import api from "@/api";
import { ActivityForm } from "@/components/activity/ActivityForm";
import useForm from "@/components/activity/useForm";
import BackButton from "@/components/BackButton";
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
    newActivityQuery: queryOptions({
      queryKey: ["space", params.spaceId, "activity", search.aId],
      queryFn: async () =>
        await api.definedActivity.showDefinedActivityAIdGet({
          aId: search.aId,
          result: true,
        }),
    }),
  }),
  loader: async ({ context: { newActivityQuery, queryClient } }) =>
    await queryClient.fetchQuery(newActivityQuery),
});

function ActivityNewRoute() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { subjectQuery, newActivityQuery } = Route.useRouteContext();
  const { data: definedActivity } = useSuspenseQuery(newActivityQuery);
  const { data: subject } = useSuspenseQuery(subjectQuery);
  const { spaceId, subjectId } = Route.useParams();
  const form = useForm<PerformedActivityUnionData>({
    reasonCode: null,
    comment: null,
    dateRange: null,
    negationIndicator: null,
    negationReason: null,
    statusCode: null,
    statusDate: null,
    contextForStudySiteId: null,
    containingEpochId: null,
    instantiatedDefinedActivityId: definedActivity.id,
    resultedPerformedObservationResult: [],
  });
  const mutation = useMutation({
    mutationFn: (data: PerformedActivityUnionData) =>
      api.subjects.createSpaceSpaceIdSubjectSubjectIdActivityPost({
        spaceId,
        subjectId,
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
