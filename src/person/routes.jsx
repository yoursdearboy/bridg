import * as api from "./api";
import Index from "./index";
import Edit from "./edit";
import Show from "./show";

export default [
  {
    path: "",
    Component: Index,
  },
  {
    path: ":id",
    Component: Show,
    loader: ({ params: { id } }) => api.find(id),
  },
  {
    path: ":id/edit",
    Component: Edit,
    loader: ({ params: { id } }) => api.find(id),
  },
];
