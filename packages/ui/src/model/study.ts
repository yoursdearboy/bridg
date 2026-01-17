import {
  instanceOfPerformedActivityData,
  instanceOfPerformedObservationData,
  instanceOfPerformedSpecimenCollectionData,
  type PerformedActivityUnionData,
} from "@bridg/api-ts";

export const getClassNameOfPerformedActivityUnionData = (
  data: PerformedActivityUnionData
) => {
  if (instanceOfPerformedObservationData(data)) {
    return "PerformedObservation";
  }
  if (instanceOfPerformedSpecimenCollectionData(data)) {
    return "PerformedSpecimenCollection";
  }
  if (instanceOfPerformedActivityData(data)) {
    return "PerformedActivity";
  }
  throw new Error("Instance of unknown class");
};
