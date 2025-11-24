import {
  Box,
  LoadingOverlay,
  NumberInput,
  Select,
  TextInput,
} from "@mantine/core";
import { DateInput as MantineDateInput } from "@mantine/dates";
import { useQuery } from "@tanstack/react-query";
import {
  type ConceptDescriptor,
  type PhysicalQuantity,
  type DataValue,
  type DateValue,
  DataTypeName,
  type CharacterString,
} from "api-ts";
import api from "@/api";

export const ConceptDescriptorSelect = ({
  label,
  value,
  codeSystem,
}: {
  label: string | null;
  value: ConceptDescriptor | null;
  codeSystem: string;
}) => {
  const { data, isLoading } = useQuery({
    queryFn: () =>
      api.codeSystem.expandCodeSystemCodeSystemExpandGet({
        codeSystem,
      }),
    queryKey: ["codeSystem", codeSystem],
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
  unit,
}: {
  label: string | null;
  value: PhysicalQuantity | null;
  unit: string;
}) => (
  <NumberInput
    value={value?.value || ""}
    label={
      <>
        {label}, {unit}
      </>
    }
    hideControls
  />
);

const DateInput = ({
  label,
  value,
}: {
  label: string | null;
  value: DateValue | null;
}) => (
  <MantineDateInput
    label={label}
    valueFormat="L"
    clearable
    value={value?.value || null}
  />
);

const CharacterStringInput = ({
  label,
  value,
}: {
  label: string | null;
  value: CharacterString | null;
}) => <TextInput label={label} value={value?.value || ""} />;

interface InputProps {
  label: string | null;
  type: DataTypeName;
  value: DataValue | null;
  codeSystem?: string;
  unit?: string;
}

export const Input = ({ label, type, value, codeSystem, unit }: InputProps) => {
  switch (type) {
    case DataTypeName.Cd:
      return (
        <ConceptDescriptorSelect
          label={label}
          value={value as ConceptDescriptor}
          codeSystem={codeSystem!}
        />
      );
    case DataTypeName.Pq:
      return (
        <PhysicalQuantityInput
          label={label}
          value={value as PhysicalQuantity}
          unit={unit!}
        />
      );
    case DataTypeName.TsDate:
      return <DateInput label={label} value={value as DateValue} />;
    case DataTypeName.TsDatetime:
      return <p>Not implemented</p>;
    default:
      return (
        <CharacterStringInput label={label} value={value as CharacterString} />
      );
  }
};
