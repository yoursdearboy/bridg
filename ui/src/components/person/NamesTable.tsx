import api from "@/api";
import {
  Card,
  Group,
  Text,
  Table,
  Button,
  Modal,
  LoadingOverlay,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  QueryClientProvider,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { NameForm } from "../NameForm";

interface NamesTableProps {
  personId: string;
}

export const NamesTable = ({ personId }: NamesTableProps) => {
  const [opened, { open, close }] = useDisclosure(false);
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const {
    isPending,
    error,
    data: names,
  } = useQuery({
    queryKey: ["person", personId, "names"],
    queryFn: () => api.persons.indexPersonsPersonIdNamesGet({ personId }),
  });

  const handleSuccess = () => {
    queryClient.invalidateQueries({
      queryKey: ["person", personId, "names"],
    });
    close();
  };

  if (isPending) return <LoadingOverlay visible />;
  if (error)
    return (
      <Text color="red">
        {t("Error loading names:")} {error.message}
      </Text>
    );

  const rows = names.map((name) => (
    <Table.Tr key={`${name.id}`}>
      <Table.Td>{name.family || "-"}</Table.Td>
      <Table.Td>{name.given || "-"}</Table.Td>
      <Table.Td>{name.middle || "-"}</Table.Td>
      <Table.Td>{name.patronymic || "-"}</Table.Td>
    </Table.Tr>
  ));
  return (
    <QueryClientProvider client={queryClient}>
      <Card withBorder shadow="sm" radius="md">
        <Card.Section withBorder inheritPadding py="xs">
          <Group justify="space-between">
            <Text fw={500}>{t("Person names")}</Text>
            <Button variant="outline" size="compact-sm" onClick={open} fw={500}>
              {t("Add")}
            </Button>
          </Group>
        </Card.Section>

        <Table striped highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>{t("Family name")}</Table.Th>
              <Table.Th>{t("Given name")}</Table.Th>
              <Table.Th>{t("Middle name")}</Table.Th>
              <Table.Th>{t("Patronymic")}</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Card>

      <Modal
        opened={opened}
        onClose={close}
        title={t("Add new name")}
        size="lg"
      >
        <NameForm
          personId={personId}
          onClose={close}
          onSuccess={handleSuccess}
        />
      </Modal>
    </QueryClientProvider>
  );
};
