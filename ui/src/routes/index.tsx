import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import api from "../api";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const query = useQuery({
    queryKey: ["spaces"],
    queryFn: () => api.indexSpacesGet(),
  });

  return (
    <div>
      <pre>{JSON.stringify(query.data)}</pre>
    </div>
  );
}
