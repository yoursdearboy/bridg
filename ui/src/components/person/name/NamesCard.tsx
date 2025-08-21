import {
  Modal,
  LoadingOverlay,
  Text,
  Card,
  Group,
  Button,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { NameForm } from "./NameForm";
import { NamesTable } from "./NamesTable";
import api from "@/api";
import { useTranslation } from "react-i18next";

interface NamesCardProps {
  personId: string;
}

export const NamesCard = ({ personId }: NamesCardProps) => {
  const [opened, { open, close }] = useDisclosure(false);
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const {
    isPending,
    isError,
    error,
    data: names = [],
  } = useQuery({
    queryKey: ["person", personId, "names"],
    queryFn: () =>
      api.persons.indexPersonsPersonIdNamesGet({
        personId,
      }),
  });

  const handleSuccess = () => {
    queryClient
      .invalidateQueries({
        queryKey: ["person", personId, "names"],
      })
      .then(close)
      .catch((err) => console.error("Query invalidation failed:", err));
  };

  if (isPending) return <LoadingOverlay visible />;

  if (isError) {
    return (
      <Text color="red">{t("errorMessage", { error: error.message })}</Text>
    );
  }

  return (
    <>
      <Card withBorder shadow="sm" radius="md">
        <Card.Section withBorder inheritPadding py="xs">
          <Group justify="space-between">
            <Text fw={500}>{t("NamesCard.title")}</Text>

            <Button
              variant="outline"
              size="compact-sm"
              onClick={open}
              fw={500}
              loading={isPending}
            >
              {t("add")}
            </Button>
          </Group>
        </Card.Section>
        <NamesTable
          names={names}
          personId={personId}
          onDeleteSuccess={handleSuccess}
          onUpdateSuccess={handleSuccess}
        />
      </Card>

      <Modal
        opened={opened}
        onClose={close}
        title={t("add")}
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
