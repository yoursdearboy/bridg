import { Modal } from "@mantine/core";
import { useTranslation } from "react-i18next";

interface NameFormProps {
  opened: boolean;
  onClose: () => void;
}

export const NameForm = ({ opened, onClose }: NameFormProps) => {
  const { t } = useTranslation();

  return (
    <Modal opened={opened} onClose={onClose} title={t("Add new name")}>
      <div>{t("form")}</div>
    </Modal>
  );
};
