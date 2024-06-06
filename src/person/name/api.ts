export const find = (personId, id) => fetch(`/api/persons/${personId}/name/${id}`);
export const update = async (personId, id, data) => {
  const res = await fetch(`/api/persons/${personId}/name/${id}`, {
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
