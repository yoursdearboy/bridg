import { useLoaderData } from "react-router-dom";

export default function Edit() {
  const person = useLoaderData();
  return (
    <div>
      Name: {person.primary_name?.given} {person.primary_name?.family}
    </div>
  );
}
