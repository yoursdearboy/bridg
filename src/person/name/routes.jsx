import * as personAPI from "../api";
import * as nameAPI from "./api";
import Edit from "./edit";

export default [
  {
    path: ":nameId",
    children: [
      {
        path: "edit",
        Component: Edit,
        loader: async ({ params: { personId, nameId } }) => ({
          person: await personAPI.find(personId).then((x) => x.json()),
          name: await nameAPI.find(personId, nameId).then((x) => x.json()),
        }),
      },
    ],
  },
];
