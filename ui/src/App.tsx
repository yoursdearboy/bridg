import { useQuery } from "@tanstack/react-query";
import api from "./api";

export default function App() {
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
