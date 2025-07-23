import {
  DefaultApi as SpacesApi,
  Configuration,
  SubjectsApi,
  SitesApi,
} from "bridg-ts";

const config = new Configuration({
  basePath: "/api",
});

export const sites = new SitesApi(config);
export const spaces = new SpacesApi(config);
export const subjects = new SubjectsApi(config);

export default {
  sites,
  spaces,
  subjects,
};
