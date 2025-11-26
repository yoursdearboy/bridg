import { Box, Grid, Group, Stack, Text, Title } from "@mantine/core";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import api from "@/api";
import { ActivityForm } from "@/components/activity/ActivityForm";
import { Route as SpacesSpaceIdSubjectsSubjectIdRoute } from "@/routes/spaces/$spaceId/subjects/$subjectId/route";

export const Route = createFileRoute(
  "/spaces/$spaceId/subjects/$subjectId/activities/$obsId/edit"
)({
  component: ActivityEditRoute,
  beforeLoad: ({ params }) => ({
    breadcrumb: () => i18next.t("ActivityEditPage.breadcrumb"),
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

function ActivityEditRoute() {
  const { query: subjectQuery } =
    SpacesSpaceIdSubjectsSubjectIdRoute.useRouteContext();
  const { query } = Route.useRouteContext();
  const {
    isError,
    error,
    data: { definedActivity, performedActivity },
  } = useSuspenseQuery(query);
  const {
    isError: isSubjectError,
    error: subjectError,
    data: subject,
  } = useSuspenseQuery(subjectQuery);
  const { t } = useTranslation();

  if (isError || isSubjectError)
    return (
      <Text color="red">
        {t("errorMessage", { error: (error || subjectError).message })}
      </Text>
    );

  return (
    <Stack gap="md">
      <Group justify="space-between">
        <Title order={2}>
          {subject.performingBiologicEntity?.primaryName?.label ||
            t("StudySubject.defaultLabel")}
          <Box display="inline" px="md">
            (
            {definedActivity.nameCode.displayName || t("Activity.defaultLabel")}
            )
          </Box>
        </Title>
      </Group>

      <Grid>
        <Grid.Col span={{ base: 12, xs: 6, md: 6, lg: 6 }}>
          <ActivityForm
            definedActivity={definedActivity}
            performedActivity={performedActivity}
          />
        </Grid.Col>
      </Grid>
    </Stack>
  );
}
