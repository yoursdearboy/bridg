import {
  Configuration,
  PersonsApi,
  DefinedActivityApi,
  DefaultApi as SpacesApi,
  SubjectsApi,
  SpaceActivityApi as SpaceActivity,
  CodeSystemApi as CodeSystem,
} from "api-ts";

const config = new Configuration({
  basePath: "/api",
});

export const definedActivity = new DefinedActivityApi(config);
export const spaces = new SpacesApi(config);
export const subjects = new SubjectsApi(config);
export const persons = new PersonsApi(config);
export const spaceActivity = new SpaceActivity(config);
export const codeSystem = new CodeSystem(config);

export default {
  definedActivity,
  spaces,
  subjects,
  persons,
  spaceActivity,
  codeSystem,
};
