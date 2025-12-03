import {
  Box,
  LoadingOverlay,
  NumberInput,
  Select,
  TextInput,
} from "@mantine/core";
import {
  DateInput as MantineDateInput,
  type DateStringValue,
} from "@mantine/dates";
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
  onChange,
}: {
  label: string | null;
  value: ConceptDescriptor | null;
  codeSystem: string;
  onChange: (value: ConceptDescriptor | null) => void;
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
  const parse = (x: string | null): ConceptDescriptor | null =>
    x
      ? {
          dataTypeName: "CD",
          code: x,
          codeSystem: codeSystem,
        }
      : null;
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
        onChange={(x) => onChange(parse(x))}
      />
    </Box>
  );
};

const PhysicalQuantityInput = ({
  label,
  value,
  unit,
  onChange,
}: {
  label: string | null;
  value: PhysicalQuantity | null;
  unit: string;
  onChange: (value: PhysicalQuantity | null) => void;
}) => {
  const parse = (x: number | string): PhysicalQuantity | null =>
    x !== ""
      ? {
          dataTypeName: "PQ",
          value: typeof x === "number" ? x : parseFloat(x),
          unit: unit,
        }
      : null;
  return (
    <NumberInput
      value={value !== null ? value.value : ""}
      label={
        <>
          {label}, {unit}
        </>
      }
      styles={{ input: { width: 200 } }}
      hideControls
      onChange={(x) => onChange(parse(x))}
    />
  );
};

const DateInput = ({
  label,
  value,
  onChange,
}: {
  label: string | null;
  value: DateValue | null;
  onChange: (value: DateValue | null) => void;
}) => {
  const parse = (x: DateStringValue | null): DateValue | null =>
    x
      ? {
          dataTypeName: "TS.DATE",
          value: new Date(x),
        }
      : null;
  return (
    <MantineDateInput
      label={label}
      valueFormat="L"
      clearable
      value={value?.value || null}
      onChange={(x) => onChange(parse(x))}
    />
  );
};

const CharacterStringInput = ({
  label,
  value,
  onChange,
}: {
  label: string | null;
  value: CharacterString | null;
  onChange: (value: CharacterString | null) => void;
}) => {
  const parse = (x: string | null): CharacterString | null =>
    x
      ? {
          dataTypeName: "ST",
          value: x,
        }
      : null;
  return (
    <TextInput
      label={label}
      value={value?.value || ""}
      onChange={(e) => onChange(parse(e.target.value))}
    />
  );
};

interface InputProps {
  label: string | null;
  type: DataTypeName;
  value: DataValue | null;
  onChange: (value: DataValue | null) => void;
  codeSystem?: string;
  unit?: string;
}

export const Input = ({
  label,
  type,
  value,
  onChange,
  codeSystem,
  unit,
}: InputProps) => {
  switch (type) {
    case DataTypeName.Cd:
      return (
        <ConceptDescriptorSelect
          label={label}
          value={value as ConceptDescriptor}
          codeSystem={codeSystem!}
          onChange={(value) => onChange(value as DataValue)}
        />
      );
    case DataTypeName.Pq:
      return (
        <PhysicalQuantityInput
          label={label}
          value={value as PhysicalQuantity}
          unit={unit!}
          onChange={(value) => onChange(value as DataValue)}
        />
      );
    case DataTypeName.TsDate:
      return (
        <DateInput
          label={label}
          value={value as DateValue}
          onChange={(value) => onChange(value as DataValue)}
        />
      );
    case DataTypeName.TsDatetime:
      return <p>Not implemented</p>;
    default:
      return (
        <CharacterStringInput
          label={label}
          value={value as CharacterString}
          onChange={(value) => onChange(value as DataValue)}
        />
      );
  }
};
