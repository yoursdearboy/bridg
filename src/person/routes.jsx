import Index from "./index";
import Edit from "./edit";

export default [
  {
    path: "",
    element: <Index />,
  },
  {
    path: ":id",
    Component: Edit,
  },
];
