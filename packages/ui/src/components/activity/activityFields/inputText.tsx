import { TextInput } from "@mantine/core";

interface InputTextProps {
  label: string | null | undefined,
}

export const InputText = ({ label }: InputTextProps) => {
  return <TextInput label={label} withAsterisk />;
};
