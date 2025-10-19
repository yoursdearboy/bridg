import {
  Box,
  LoadingOverlay,
  NumberInput,
  Select,
  TextInput,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useQuery } from "@tanstack/react-query";
import type {
  ConceptDescriptor,
  DefinedObservationResult,
  DefinedObservationResultValue,
  ModelDate,
  PhysicalQuantity,
} from "api-ts";
import api from "@/api";

export const ObservationResult = ({
  result,
}: {
  result: DefinedObservationResult;
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
  value: DefinedObservationResultValue | null;
}

const Input = ({ label, value }: InputProps) => {
  switch (value?.dataType) {
    case "ST":
    case "ST.NT":
    case "ST.SIMPLE":
      return <InputText label={label} value={value} />;
    case "CD":
      return <ConceptDescriptorSelect label={label} value={value} />;
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
  value: DefinedObservationResultValue | null;
}) => {
  return <TextInput label={label} />;
};

const ConceptDescriptorSelect = ({
  label,
  value,
}: {
  label: string | null;
  value: ConceptDescriptor | null;
}) => {
  const { data, isLoading } = useQuery({
    queryFn: () =>
      api.valueSet.expandCodeSystemCodeSystemIdExpandGet({
        codeSystemId: value!.codeSystem,
      }),
    queryKey: ["codeSystem", value?.codeSystem],
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
      <Select label={label} data={options} />
    </Box>
  );
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
