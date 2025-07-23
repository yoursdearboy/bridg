import { createFileRoute } from "@tanstack/react-router";
import api from "../../../../api";

export const Route = createFileRoute("/spaces/$spaceId/subjects/")({
  loader: ({ params }) => api.subjects.indexSpacesSpaceIdSubjectsGet(params),
  component: RouteComponent,
});

function RouteComponent() {
  const subjects = Route.useLoaderData();
  return (
    <ul>
      {subjects.map((s) => (
        <li>{s.performingBiologicEntity?.primaryName}</li>
      ))}
    </ul>
  );
}
