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
    queryFn: async () => {
      const response = await api.persons.indexPersonsPersonIdNamesGet({
        personId,
      });
      return response;
    },
  });

  const handleSuccess = () => {
    queryClient.invalidateQueries({
      queryKey: ["person", personId, "names"],
    });
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
      <Card withBorder shadow="sm" radius="md">
        <Card.Section withBorder inheritPadding py="xs">
          <Group justify="space-between">
            <Text fw={500}>{t("Person names")}</Text>

            <Button
              variant="outline"
              size="compact-sm"
              onClick={open}
              fw={500}
              loading={isPending}
            >
              {t("Add")}
            </Button>
          </Group>
        </Card.Section>
        <NamesTable names={names} />
      </Card>

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
