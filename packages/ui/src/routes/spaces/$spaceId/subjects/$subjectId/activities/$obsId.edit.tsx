import { queryOptions } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import type { PerformedObservation } from "api-ts";
import i18next from "i18next";
import api from "@/api";

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
  return (
    <div>
      Hello "/spaces/$spaceId/subjects/$subjectId/activities/$saId/edit"!
    </div>
  );
}
