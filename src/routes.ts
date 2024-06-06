import Layout from "./Layout";
import personRoutes from "./person/routes";

export default [
  {
    path: "/",
    Component: Layout,
    children: [
      {
        path: "",
      },
      {
        path: "/persons",
        children: personRoutes,
      },
    ],
  },
];
