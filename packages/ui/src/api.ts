import {
  Configuration,
  PersonsApi,
  SitesApi,
  DefinedActivityApi,
  DefaultApi as SpacesApi,
  SubjectsApi,
} from "api-ts";

const config = new Configuration({
  basePath: "/api",
});

export const definedActivity = new DefinedActivityApi(config);
export const sites = new SitesApi(config);
export const spaces = new SpacesApi(config);
export const subjects = new SubjectsApi(config);
export const persons = new PersonsApi(config);

export default {
  definedActivity,
  sites,
  spaces,
  subjects,
  persons,
};
