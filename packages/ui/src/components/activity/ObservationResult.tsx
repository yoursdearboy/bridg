import { NumberInput, TextInput } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import type {
  ModelDate,
  PerformedObservationResult,
  PhysicalQuantity,
} from "api-ts";

export const ObservationResult = ({
  result,
}: {
  result: PerformedObservationResult;
}) => {
  return (
    <Input
      label={result.typeCode?.displayName || "unnamed field"}
      value={result.value}
    />
  );
};

interface InputProps {
  label: string | null;
  value: string | null;
}

const Input = ({ label, value }: InputProps) => {
  switch (value?.dataType) {
    case "ST":
    case "ST.NT":
    case "ST.SIMPLE":
      return <InputText label={label} value={value} />;
    case "PQ":
      return <PhysicalQuantityInput label={label} value={value} />;
    case "TS.DATE":
      return <InputDate label={label} value={value} />;
    case "TS.DATETIME":
      throw new Error("not implemented");
    default:
      return <InputText label={label} value={value} />;
  }
};

const InputText = ({
  label,
}: {
  label: string | null;
  value: string | null;
}) => {
  return <TextInput label={label} />;
};

const PhysicalQuantityInput = ({
  label,
  value,
}: {
  label: string | null;
  value: PhysicalQuantity | null;
}) => {
  return (
    <NumberInput
      label={
        <>
          {label}, {value?.unit}
        </>
      }
      hideControls
    />
  );
};

const InputDate = ({
  label,
}: {
  label: string | null;
  value: ModelDate | null;
}) => {
  return <DateInput label={label} valueFormat="L" clearable />;
};
