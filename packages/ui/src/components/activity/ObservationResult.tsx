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
  type PerformedObservationResult,
  type PhysicalQuantity,
  type Value,
} from "api-ts";
import api from "@/api";

export const ObservationResult = ({
  result,
  definedResult,
}: {
  result: PerformedObservationResult;
  definedResult: DefinedObservationResult;
}) => {
  return (
    <Input
      label={result.typeCode?.displayName || "unnamed field"}
      value={result.value}
      config={definedResult}
    />
  );
};

interface InputProps {
  label: string | null;
  value: Value | null;
  config: DefinedObservationResult;
}

const Input = ({ label, value, config }: InputProps) => {
  switch (config.targetType) {
    case "CD":
      return (
        <ConceptDescriptorSelect
          label={label}
          value={value as ConceptDescriptor}
          config={config}
        />
      );
    case "PQ":
      return (
        <PhysicalQuantityInput
          label={label}
          value={value as PhysicalQuantity}
          config={config}
        />
      );
    case "TS.DATE":
      return <InputDate label={label} value={value as Date} />;
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
  value: Value | null;
}) => {
  return <TextInput label={label} />;
};

const ConceptDescriptorSelect = ({
  label,
  value,
  config,
}: {
  label: string | null;
  value: ConceptDescriptor | null;
  config: DefinedObservationResult;
}) => {
  const { data, isLoading } = useQuery({
    queryFn: () =>
      api.codeSystem.expandCodeSystemCodeSystemExpandGet({
        codeSystem: config.targetCodingSystem!,
      }),
    queryKey: ["codeSystem", config.targetCodingSystem],
  });
  const options = (data || []).map((cd) => ({
    label: cd.displayName || cd.code,
    // FIXME: code must be defined
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
  config,
}: {
  label: string | null;
  value: PhysicalQuantity | null;
  config: DefinedObservationResult;
}) => {
  return (
    <NumberInput
      value={value?.value || ""}
      label={
        <>
          {label}, {value?.unit || config.targetUnit}
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
  value: Date | null;
}) => {
  return <DateInput label={label} valueFormat="L" clearable value={value} />;
};
