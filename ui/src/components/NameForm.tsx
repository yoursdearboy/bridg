import { Button, Group, TextInput } from "@mantine/core";
import { useTranslation } from "react-i18next";

interface NameFormProps {
  onClose: () => void;
}

export const NameForm = ({ onClose }: NameFormProps) => {
  const { t } = useTranslation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onClose();
  };

  return (
 "form"
  );
};