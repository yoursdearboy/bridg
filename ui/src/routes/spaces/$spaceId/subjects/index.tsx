import { createFileRoute, Link } from "@tanstack/react-router";
import { Route as newRoute } from "./new";
import api from "@/api";

export const Route = createFileRoute("/spaces/$spaceId/subjects/")({
  loader: ({ params }) => api.subjects.indexSpacesSpaceIdSubjectsGet(params),
  component: RouteComponent,
});

function RouteComponent() {
  const subjects = Route.useLoaderData();
  return (
    <div>
      <Link from={Route.to} to={newRoute.to}>
        New
      </Link>
      <ul>
        {subjects.map((s) => (
          <li>{s.performingBiologicEntity?.primaryName}</li>
        ))}
      </ul>
    </div>
  );
}
