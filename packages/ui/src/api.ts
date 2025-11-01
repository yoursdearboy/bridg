import {
  Configuration,
  ObservationResultApi,
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
export const observationResult = new ObservationResultApi(config);

observationResult
  .indexSpacesSpaceIdSubjectsSubjectIdObservationObsIdResultGet({
    spaceId: "ce946229-9746-46cd-8dd3-b27a2fbfd48a",
    subjectId: "1944c046-95b3-4cb4-82e2-c789950e29fc",
    obsId: "8ac78da9-3c23-4770-94e9-ebaee8432b4b",
  })
  .then((x) => {
    console.log(x);
  })
  .catch(console.error);

export default {
  sites,
  spaces,
  subjects,
  persons,
};
