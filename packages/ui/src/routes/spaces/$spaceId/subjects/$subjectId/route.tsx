import { queryOptions } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import api from "@/api";
import i18next from "@/i18n";

export const Route = createFileRoute("/spaces/$spaceId/subjects/$subjectId")({
  beforeLoad: ({ params }) => ({
    query: queryOptions({
      queryKey: ["subject", params.subjectId],
      queryFn: () => api.subjects.showSpacesSpaceIdSubjectsSubjectIdGet(params),
    }),
    breadcrumb: () => i18next.t("SubjectShowPage.breadcrumb"),
  }),
  loader: ({ context: { query, queryClient } }) =>
    queryClient.fetchQuery(query),
});
