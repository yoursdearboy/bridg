import {
  Configuration,
  PersonsApi,
  SitesApi,
  DefaultApi as SpacesApi,
  SubjectsApi,
} from "api-ts";

const config = new Configuration({
  basePath: "/api",
});

export const sites = new SitesApi(config);
export const spaces = new SpacesApi(config);
export const subjects = new SubjectsApi(config);
export const persons = new PersonsApi(config);

export default {
  sites,
  spaces,
  subjects,
  persons,
};
