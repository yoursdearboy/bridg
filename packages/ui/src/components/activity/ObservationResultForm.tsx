import {
  type DataValue,
  type DefinedObservationResult,
  type PerformedObservationResultData,
} from "@bridg/api-ts";
import { Input } from "./Input";

interface ObservatonResultFormProps {
  definedObservationResult: DefinedObservationResult;
  performedObservationResult: PerformedObservationResultData;
  onChange: (result: PerformedObservationResultData) => void;
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
