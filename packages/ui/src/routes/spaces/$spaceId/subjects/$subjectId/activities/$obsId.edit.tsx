import { Grid, Group, Stack, Text, Title } from "@mantine/core";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import type { DefinedActivityUnion } from "api-ts";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import api from "@/api";
import { ActivityForm } from "@/components/activity/ActivityForm";

export const Route = createFileRoute(
  "/spaces/$spaceId/subjects/$subjectId/activities/$obsId/edit"
)({
  component: EditActivityComponent,
  beforeLoad: ({ params }) => ({
    breadcrumb: ({
      loaderData,
    }: {
      loaderData: { definedActivity: DefinedActivityUnion };
    }) =>
      loaderData.definedActivity.nameCode.displayName ||
      i18next.t("Activity.defaultLabel"),
    query: queryOptions({
      queryKey: ["subject", params.subjectId, "activity", params.obsId],
      queryFn: async () => {
        const performedActivity =
          await api.subjects.showSpacesSpaceIdSubjectsSubjectIdActivityAIdGet({
            spaceId: params.spaceId,
            subjectId: params.subjectId,
            aId: params.obsId,
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
  loader: async ({ context: { query, queryClient } }) =>
    await queryClient.fetchQuery(query),
});

function EditActivityComponent() {
  const { query } = Route.useRouteContext();
  const {
    isError,
    error,
    data: { definedActivity, performedActivity },
  } = useSuspenseQuery(query);
  const { t } = useTranslation();

  if (isError)
    return (
      <Text color="red">{t("errorMessage", { error: error.message })}</Text>
    );

  return (
    <Stack gap="md">
      <Group justify="space-between">
        <Title order={2}>
          {definedActivity.nameCode.displayName || t("Activity.defaultLabel")}
        </Title>
      </Group>

      <Grid>
        <Grid.Col span={{ base: 12, xs: 8, md: 4, lg: 3 }}>
          <ActivityForm
            definedActivity={definedActivity}
            performedActivity={performedActivity}
          />
        </Grid.Col>
      </Grid>
    </Stack>
  );
}
