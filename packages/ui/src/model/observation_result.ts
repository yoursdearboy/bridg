import type {
  DefinedObservationResult,
  PerformedObservationResultData,
} from "api-ts";
import { isEqualCD } from "./datatype";

const definedToPerformedObservationResult = (
  dor: DefinedObservationResult
): PerformedObservationResultData => {
  return {
    typeCode: dor.typeCode,
    value: dor.value,
    valueNullFlavorReason: null,
    baselineIndicator: null,
    derivedIndicator: null,
    createdDate: null,
    reportedDate: null,
    comment: null,
  };
};

interface ObservationResultMatch {
  definedObservationResult: DefinedObservationResult;
  performedObservationResult: PerformedObservationResultData;
}

export const doesMatchObservationResult = (
  a: DefinedObservationResult,
  b: PerformedObservationResultData
) => a.typeCode && b.typeCode && isEqualCD(a.typeCode, b.typeCode);

export const matchObservationResult = (
  ds: DefinedObservationResult[],
  ps: PerformedObservationResultData[]
): ObservationResultMatch[] =>
  ds.map((d) => ({
    definedObservationResult: d,
    performedObservationResult:
      ps.find((p) => doesMatchObservationResult(d, p)) ||
      definedToPerformedObservationResult(d),
  }));
