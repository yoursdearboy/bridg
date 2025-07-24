import api from "@/api";
import ButtonLink from "@/components/ButtonLink";
import { createFileRoute } from "@tanstack/react-router";
import { Route as newRoute } from "./new";

export const Route = createFileRoute("/spaces/$spaceId/subjects/")({
  loader: ({ params }) => api.subjects.indexSpacesSpaceIdSubjectsGet(params),
  component: RouteComponent,
});

function RouteComponent() {
  const subjects = Route.useLoaderData();
  return (
    <div>
      <ButtonLink from={Route.to} to={newRoute.to}>
        New
      </ButtonLink>
      <ul>
        {subjects.map((s) => (
          <li>{s.performingBiologicEntity?.primaryName}</li>
        ))}
      </ul>
    </div>
  );
}
