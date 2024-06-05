import Layout from "./Layout";
import personRoutes from "./person/routes";

export default [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <div>Works</div>,
      },
      {
        path: "/persons",
        children: personRoutes,
      },
    ],
  },
];
