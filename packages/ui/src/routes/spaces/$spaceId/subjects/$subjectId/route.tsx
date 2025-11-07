import { queryOptions } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import type { StudySubject } from "api-ts";
import api from "@/api";
import i18next from "@/i18n";

export const Route = createFileRoute("/spaces/$spaceId/subjects/$subjectId")({
  beforeLoad: ({ params }) => ({
    query: queryOptions({
      queryKey: ["subject", params.subjectId],
      queryFn: () => api.subjects.showSpacesSpaceIdSubjectsSubjectIdGet(params),
    }),
    breadcrumb: ({ loaderData: subject }: { loaderData: StudySubject }) =>
      subject.performingBiologicEntity?.primaryName?.label ||
      i18next.t("SubjectShowPage.breadcrumbDefault"),
  }),
  loader: ({ context: { query, queryClient } }) =>
    queryClient.fetchQuery(query),
});
