import * as api from "./api";
import Edit from "./edit";
import Index from "./index";
import nameRoutes from "./name/routes";
import Show from "./show";

export default [
  {
    handle: {
      breadcrumb: "Persons",
    },
    children: [
      {
        path: "",
        Component: Index,
      },
      {
        id: "person",
        path: ":personId",
        loader: ({ params: { personId } }: any) => api.find(personId),
        handle: {
          breadcrumb: (data) => data.primary_name?.full,
        },
        children: [
          {
            path: "",
            Component: Show,
            loader: ({ params: { personId } }: any) => api.find(personId),
          },
          {
            path: "edit",
            Component: Edit,
            loader: ({ params: { personId } }: any) => api.find(personId),
            handle: {
              breadcrumb: "Edit",
            },
          },
          {
            path: "name",
            children: nameRoutes,
          },
        ],
      },
    ],
  },
];
