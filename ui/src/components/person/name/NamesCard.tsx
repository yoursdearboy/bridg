import { Modal, LoadingOverlay, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import { NameForm } from "./NameForm";
import { NamesTable } from "./NamesTable";
import api from "@/api";
import { useTranslation } from "react-i18next";

interface NamesCardProps {
  personId: string;
}

export const NamesCard = ({ personId }: NamesCardProps) => {
  const [opened, { open, close }] = useDisclosure(false);

  const { t } = useTranslation();

  const {
    isPending,
    isError,
    error,
    data: names = [],
  } = useQuery({
    queryKey: ["person", personId, "names"],
    queryFn: () => api.persons.indexPersonsPersonIdNamesGet({ personId }),
  });

  const handleSuccess = () => {
    close();
  };

  if (isPending) return <LoadingOverlay visible />;

  if (isError) {
    return (
      <Text color="red">
        {t("Error loading names:")} {error.message}
      </Text>
    );
  }

  return (
    <>
      <NamesTable names={names} onAddClick={open} isLoading={isPending} />

      <Modal
        opened={opened}
        onClose={close}
        title={t("Add new name")}
        size="lg"
        centered
      >
        <NameForm
          personId={personId}
          onClose={close}
          onSuccess={handleSuccess}
        />
      </Modal>
    </>
  );
};
