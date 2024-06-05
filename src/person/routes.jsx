import * as api from "./api";
import Index from "./index";
import Edit from "./edit";
import Show from "./show";
import nameRoutes from "./name/routes";

export default [
  {
    path: "",
    Component: Index,
  },
  {
    id: "person",
    path: ":personId",
    loader: ({ params: { personId } }) => api.find(personId),
    children: [
      {
        path: "",
        Component: Show,
        loader: ({ params: { personId } }) => api.find(personId),
      },
      {
        path: "edit",
        Component: Edit,
        loader: ({ params: { personId } }) => api.find(personId),
      },
      {
        path: "name",
        children: nameRoutes,
      },
    ],
  },
];
