import type { PerformedObservation, StudyActivity } from "api-ts";

export const study2performedActivity = (activity: StudyActivity): PerformedObservation => {
    return {
      id: self.crypto.randomUUID(),
      reasonCode: null,
      statusCode: null,
      statusDate: null,
      contextForStudySite: null,
      containingEpoch: null,
      instantiatedDefinedActivity: activity.usedDefinedActivity,
    };
  };