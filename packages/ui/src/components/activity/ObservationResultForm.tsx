import {
  type DataValue,
  type DefinedObservationResult,
  type PerformedObservationResult,
} from "api-ts";
import { Input } from "./Input";

interface ObservatonResultFormProps {
  definedObservationResult: DefinedObservationResult;
  performedObservationResult: PerformedObservationResult;
  onChange: (result: PerformedObservationResult) => void;
}

export const ObservatonResultForm = ({
  definedObservationResult,
  performedObservationResult,
  onChange,
}: ObservatonResultFormProps) => (
  <Input
    label={definedObservationResult.typeCode?.displayName || null}
    type={definedObservationResult.targetType}
    value={performedObservationResult.value}
    onChange={(value: DataValue | null) =>
      onChange({ ...performedObservationResult, value })
    }
    codeSystem={definedObservationResult.targetCodingSystem!}
    unit={definedObservationResult.targetUnit!}
  />
);
