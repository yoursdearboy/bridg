import { useQuery } from "@tanstack/react-query";
import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import api from "../api";

function Nav() {
  const query = useQuery({
    queryKey: ["spaces"],
    queryFn: () => api.spaces.indexSpacesGet(),
  });
  return (
    <ul>
      {query.data?.map((s) => (
        <li>
          <Link
            to="/spaces/$spaceId/subjects"
            params={{ spaceId: s.id }}
            className="[&.active]:font-bold"
          >
            {s.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export const Route = createRootRoute({
  component: () => (
    <>
      <Nav />
      <hr />
      <Outlet />
    </>
  ),
});
