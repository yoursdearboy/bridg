import * as api from "./api";
import Index from "./index";
import Edit from "./edit";

export default [
  {
    path: "",
    element: <Index />,
  },
  {
    path: ":id",
    loader: ({ params: { id } }) => api.find(id),
    Component: Edit,
  },
];
