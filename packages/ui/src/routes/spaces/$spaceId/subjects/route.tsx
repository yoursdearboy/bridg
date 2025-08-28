import { createFileRoute } from "@tanstack/react-router";
import i18next from "../../../../i18n";

export const Route = createFileRoute("/spaces/$spaceId/subjects")({
  beforeLoad: () => ({
    breadcrumb: i18next.t("SubjectIndexPage.breadcrumb"),
  }),
});
