import type {
  ConceptDescriptor,
  DefinedObservationResult,
  PerformedObservationResult,
} from "api-ts";

export const isEqualCD = (a: ConceptDescriptor, b: ConceptDescriptor) =>
  a.code == b.code && a.codeSystem == b.codeSystem;

const doesMatchObservationResult = (
  def: DefinedObservationResult,
  perf: PerformedObservationResult
) => def.typeCode && perf.typeCode && isEqualCD(def.typeCode, perf.typeCode);

const definedToPerformedObservationResult = (
  dor: DefinedObservationResult
): PerformedObservationResult => {
  return {
    ...dor,
    id: self.crypto.randomUUID(),
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
  performedObservationResult: PerformedObservationResult;
}

export const matchObservationResult = (
  ds: DefinedObservationResult[],
  ps: PerformedObservationResult[]
): ObservationResultMatch[] =>
  ds.map((d) => ({
    definedObservationResult: d,
    performedObservationResult:
      ps.find((p) => doesMatchObservationResult(d, p)) ||
      definedToPerformedObservationResult(d),
  }));
