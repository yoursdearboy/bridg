import { TextInput } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import type { DefinedObservationResult } from "api-ts";

interface ActivityResultWrapperProps {
  result: DefinedObservationResult;
}

export const ActivityResultWrapper = ({
  result,
}: ActivityResultWrapperProps) => {
  return (
    <Input
      label={result.typeCode?.displayName || "unamed field"}
      kind={result.valueType}
    />
  );
};

interface InputProps {
  label: string | null | undefined;
  kind: string | null | undefined | Error;
}

const Input = ({ label, kind }: InputProps) => {
  switch (kind) {
    case "str":
      return <InputText label={label} />;
    case "int":
      return <InputText label={label} />;
    case "date":
      return <InputDate label={label} />;
    case "datetime":
      throw new Error("not implemented");
    default:
      return <InputText label={label} />;
  }
};

interface InputTextProps {
  label: string | null | undefined;
}

const InputText = ({ label }: InputTextProps) => {
  return <TextInput label={label} />;
};

interface InputDateProps {
  label: string | null | undefined;
}

const InputDate = ({ label }: InputDateProps) => {
  return <DateInput label={label} valueFormat="L" clearable />;
};
