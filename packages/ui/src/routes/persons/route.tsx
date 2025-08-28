import { createFileRoute } from "@tanstack/react-router";
import i18next from "../../i18n";

export const Route = createFileRoute("/persons")({
  beforeLoad: () => ({
    breadcrumb: i18next.t("PersonIndexPage.breadcrumb"),
  }),
});
