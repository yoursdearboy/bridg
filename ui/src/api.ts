import { DefaultApi as SpacesApi, Configuration, SubjectsApi } from "bridg-ts";

const config = new Configuration({
  basePath: "/api",
});

export const spaces = new SpacesApi(config);
export const subjects = new SubjectsApi(config);

export default {
  spaces,
  subjects,
};
