import { LoadingOverlay, Text } from "@mantine/core";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import type { PerformedObservation } from "api-ts";
import i18next, { t } from "i18next";
import api from "@/api";
import { ActivityFormWrapper } from "@/components/activity/ActivityForm";

export const Route = createFileRoute(
  "/spaces/$spaceId/subjects/$subjectId/activities/$obsId/edit"
)({
  component: EditObservationComponent,
  beforeLoad: ({ params }) => ({
    breadcrumb: ({
      loaderData: observation,
    }: {
      loaderData: PerformedObservation;
    }) =>
      observation.instantiatedDefinedActivity?.nameCode.displayName ||
      i18next.t("EditActivityRoute.defaultBreadcrumb"),
    query: queryOptions({
      queryKey: [
        "subjects",
        params.subjectId,
        "activity",
        params.obsId,
        "edit",
      ],
      queryFn: () =>
        api.subjects.showSpacesSpaceIdSubjectsSubjectIdObservationObsIdGet(
          params
        ),
    }),
  }),
  loader: async ({ context: { query, queryClient } }) =>
    await queryClient.fetchQuery(query),
});

function EditObservationComponent() {
  const observation = Route.useLoaderData();
  const { spaceId, subjectId } = Route.useParams();
  const query = useQuery({
    queryKey: [
      "subjects",
      subjectId,
      "obsdervations",
      observation.id,
      "result",
    ],
    queryFn: () =>
      api.subjects.indexSpacesSpaceIdSubjectsSubjectIdObservationObsIdResultGet(
        {
          spaceId,
          subjectId,
          obsId: observation.id,
        }
      ),
  });
  const { isPending, isError, error, data: results } = query;
  return (
    <>
      <LoadingOverlay visible={isPending} />
      {isError && (
        <Text color="red">{t("errorMessage", { error: error.message })}</Text>
      )}
      {!isPending && !isError && (
        <ActivityFormWrapper
          spaceId={spaceId}
          subjectId={subjectId}
          results={results}
        />
      )}
    </>
  );
}
