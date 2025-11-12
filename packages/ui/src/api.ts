import {
  Configuration,
  PersonsApi,
  SitesApi,
  DefinedActivityApi,
  DefaultApi as SpacesApi,
  SubjectsApi,
  instanceOfPerformedObservation,
  DataValueToJSONTyped,
} from "api-ts";

const config = new Configuration({
  basePath: "/api",
});

export const definedActivity = new DefinedActivityApi(config);
export const sites = new SitesApi(config);
export const spaces = new SpacesApi(config);
export const subjects = new SubjectsApi(config);
export const persons = new PersonsApi(config);

subjects.showSpacesSpaceIdSubjectsSubjectIdActivityAIdGet({
  spaceId: "ce946229-9746-46cd-8dd3-b27a2fbfd48a",
  subjectId: "1944c046-95b3-4cb4-82e2-c789950e29fc",
  aId: "8ac78da9-3c23-4770-94e9-ebaee8432b4b",
  result: true
}).then(a => {
  if (instanceOfPerformedObservation(a)) {
    a.resultedPerformedObservationResult.forEach(r => {
      console.log(r.value, "->", DataValueToJSONTyped(r.value));
    });
  }
}).catch(console.error);

export default {
  definedActivity,
  sites,
  spaces,
  subjects,
  persons,
};
