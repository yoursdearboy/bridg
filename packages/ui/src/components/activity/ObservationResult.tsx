import {
  Box,
  LoadingOverlay,
  NumberInput,
  Select,
  TextInput,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useQuery } from "@tanstack/react-query";
import {
  type ConceptDescriptor,
  type DefinedObservationResult,
  type PhysicalQuantity,
  type DataValue,
  type DateValue,
  type PerformedObservationResult,
} from "api-ts";
import api from "@/api";

interface InputProps {
  performedObservationResult: PerformedObservationResult;
  definedObservationResult: DefinedObservationResult;
}

// FIXME: translate default label
export const Input = ({
  definedObservationResult,
  performedObservationResult,
}: InputProps) => {
  const value = performedObservationResult.value;
  const label =
    definedObservationResult.typeCode?.displayName || "unnamed field";
  switch (definedObservationResult.targetType) {
    case "CD":
      return (
        <ConceptDescriptorSelect
          label={label}
          value={value as ConceptDescriptor}
          defObsres={definedObservationResult}
        />
      );
    case "PQ":
      return (
        <PhysicalQuantityInput
          label={label}
          value={value as PhysicalQuantity}
          defObsres={definedObservationResult}
        />
      );
    case "TS.DATE":
      return <InputDate label={label} value={value as DateValue} />;
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
  value: DataValue | null;
}) => {
  return <TextInput label={label} />;
};

export const ConceptDescriptorSelect = ({
  label,
  value,
  defObsres,
}: {
  label: string | null;
  value: ConceptDescriptor | null;
  defObsres: DefinedObservationResult;
}) => {
  const { data, isLoading } = useQuery({
    queryFn: () =>
      api.codeSystem.expandCodeSystemCodeSystemExpandGet({
        codeSystem: defObsres.targetCodingSystem!,
      }),
    queryKey: ["codeSystem", defObsres.targetCodingSystem],
  });
  const options = (data || []).map((cd) => ({
    label: cd.displayName || cd.code,
    value: cd.code,
  }));
  return (
    <Box pos="relative">
      <LoadingOverlay
        visible={isLoading}
        loaderProps={{ size: 16, type: "dots" }}
      />
      <Select
        label={label}
        data={options}
        clearable
        defaultValue={value?.code || null}
      />
    </Box>
  );
};

const PhysicalQuantityInput = ({
  label,
  value,
  defObsres,
}: {
  label: string | null;
  value: PhysicalQuantity | null;
  defObsres: DefinedObservationResult;
}) => {
  return (
    <NumberInput
      value={value?.value || ""}
      label={
        <>
          {label}, {value?.unit || defObsres.targetUnit}
        </>
      }
      hideControls
    />
  );
};

const InputDate = ({
  label,
  value,
}: {
  label: string | null;
  value: DateValue | null;
}) => {
  return (
    <DateInput label={label} valueFormat="L" clearable value={value?.value} />
  );
};
