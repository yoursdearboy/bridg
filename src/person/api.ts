export const get = (id: number) => {
  return fetch(`/api/persons/${id}`).then((x) => x.json())
}

export default {
  get
}
