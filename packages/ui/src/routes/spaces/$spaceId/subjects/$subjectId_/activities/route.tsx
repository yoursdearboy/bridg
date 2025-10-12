import { createFileRoute, Outlet } from "@tanstack/react-router";
import i18next from "@/i18n";

export const Route = createFileRoute("/spaces/$spaceId/subjects/$subjectId_/activities")({
  beforeLoad: () => ({
    breadcrumb: i18next.t("PersonIndexPage.breadcrumb"),
  }),
  component: RouteComponent,
});

function RouteComponent() {
  return <Outlet/>
}
