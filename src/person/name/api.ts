export const find = (personId, id) => fetch(`/api/persons/${personId}/names/${id}`);
export const update = async (personId, id, data) => {
  const res = await fetch(`/api/persons/${personId}/names/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.detail);
  return json;
};
