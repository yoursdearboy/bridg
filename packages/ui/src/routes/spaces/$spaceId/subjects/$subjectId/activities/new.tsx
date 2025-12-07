import { Grid, Group, Stack, Title } from "@mantine/core";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import api from "@/api";
import { ActivityForm } from "@/components/activity/ActivityForm";

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
  const { t } = useTranslation();
  const { subjectQuery, activityQuery } = Route.useRouteContext();
  const { data: definedActivity } = useSuspenseQuery(activityQuery);
  const { data: subject } = useSuspenseQuery(subjectQuery);
  const { spaceId, subjectId } = Route.useParams();
  const form = useForm<PerformedActivityUnion>(performedActivity);

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
                definedActivity={definedActivity}
                performedActivity={form.state}
                onChange={form.onChange}
              />
            </Grid.Col>
            <Grid.Col>
              <Button type="submit">{t("submit")}</Button>
            </Grid.Col>
          </Grid>
        </form>
      </Box>
    </Stack>
  );
}
