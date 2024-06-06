export const index = () => fetch(`/api/persons/`);
export const find = (id) => fetch(`/api/persons/${id}`);
export const update = async (id, data) => {
  const res = await fetch(`/api/persons/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.detail);
  return json;
};
