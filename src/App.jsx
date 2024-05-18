import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout";
import personRoutes from "./person/routes";

const router = createBrowserRouter([
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
]);

export default function App() {
  return <RouterProvider router={router} />;
}
