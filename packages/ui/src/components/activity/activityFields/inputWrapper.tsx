import { InputText } from "./inputText";

interface InputWrapperProps {
  label: string | null | undefined,
  kind: string,
}

export const InputWrapper = ({ label, kind }: InputWrapperProps) => {
  switch (kind) {
    case "text":
      return <InputText label={label} />;
    default:
      return <InputText label={label} />;
  }
};
