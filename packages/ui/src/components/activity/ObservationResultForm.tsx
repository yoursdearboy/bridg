import {
  type DefinedObservationResult,
  type PerformedObservationResult,
} from "api-ts";
import { Input } from "./Input";

interface ObservatonResultFormProps {
  definedObservationResult: DefinedObservationResult;
  performedObservationResult: PerformedObservationResult;
}

export const ObservatonResultForm = ({
  definedObservationResult,
  performedObservationResult,
}: ObservatonResultFormProps) => (
  <Input
    label={definedObservationResult.typeCode?.displayName || null}
    type={definedObservationResult.targetType}
    value={performedObservationResult.value}
    codeSystem={definedObservationResult.targetCodingSystem!}
    unit={definedObservationResult.targetUnit!}
  />
);
