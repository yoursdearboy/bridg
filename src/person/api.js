export const index = () => fetch(`/api/persons/`);
export const find = (data) => fetch(`/api/persons/${data.id}`);
export const update = async (data) => {
  const res = await fetch(`/api/persons/${data.id}`, {
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
