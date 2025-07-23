import { createFileRoute } from "@tanstack/react-router";
import api from "@/api";
import useAppForm from "@/form";

export const Route = createFileRoute("/spaces/$spaceId/subjects/new")({
  loader: async ({ params }) => ({
    sites: await api.sites.indexSpacesSpaceIdSitesGet(params),
  }),
  component: RouteComponent,
});

function RouteComponent() {
  const { sites } = Route.useLoaderData();
  const form = useAppForm({
    onSubmit: console.log,
  });
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <form.AppField name="status" children={(f) => <input type="text" />} />
      <form.AppField
        name="status_date"
        children={(f) => <input type="text" />}
      />
      <form.AppForm>
        <input type="submit" />
      </form.AppForm>
    </form>
  );
}
