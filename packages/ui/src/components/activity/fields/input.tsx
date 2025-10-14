import { TextInput } from "@mantine/core";

interface InputProps {
  label: string | null | undefined,
  kind: string,
}

export const Input = ({ label, kind }: InputProps) => {
  switch (kind) {
    case "text":
      return <InputText label={label} />;
    default:
      return <InputText label={label} />;
  }
};

interface InputTextProps {
  label: string | null | undefined,
}

const InputText = ({ label }: InputTextProps) => {
  return <TextInput label={label} withAsterisk />;
};

