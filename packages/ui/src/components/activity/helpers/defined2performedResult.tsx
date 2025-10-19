import type {
  DefinedObservationResult,
  PerformedObservationResult,
} from "api-ts";

export const defined2performedResult = (
  result: DefinedObservationResult
): PerformedObservationResult => {
  return {
    ...result,
    id: self.crypto.randomUUID(),
    valueNullFlavorReason: null,
    baselineIndicator: null,
    derivedIndicator: null,
    createdDate: null,
    reportedDate: null,
    comment: null,
  };
};
