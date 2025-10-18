import { Card, Group, Stack, Title } from "@mantine/core";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import type { StudyActivity } from "api-ts";
import api from "@/api";
import { ActivityFormWrapper } from "@/components/activity/ActivityForm";
import i18next from "@/i18n";

type SearchParams = {
  saId: string;
};

export const Route = createFileRoute(
  "/spaces/$spaceId/subjects/$subjectId/activities/new"
)({
  component: NewActivityComponent,
  validateSearch: (search: SearchParams) => {
    return {
      saId: search.saId,
    };
  },
  beforeLoad: ({ params, search }) => ({
    breadcrumb: ({ loaderData: activity }: { loaderData: StudyActivity }) =>
      activity.usedDefinedActivity.nameCode.displayName ||
      i18next.t("ShowActivityRoute.breadcrumbDefault"),
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
  return (
    <Stack gap="md">
      <Group justify="space-between">
        <Title order={2}>
          {activity.usedDefinedActivity.nameCode.displayName}
        </Title>
      </Group>

      <div>
        Hello "/spaces/{spaceId}/subjects/{subjectId}/activities/new"!
      </div>
      <Card>
        <ActivityFormWrapper
          activity={activity}
          spaceId={spaceId}
          subjectId={subjectId}
        />
      </Card>
    </Stack>
  );
}
