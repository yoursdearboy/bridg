import api from "@/api";
import { Card, Group, Text, Table, Button, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { NameForm } from "../NameForm";
const queryClient = new QueryClient();

interface NamesTableProps {
  personId: string;
}

export const NamesTable = ({ personId }: NamesTableProps) => {
  const [opened, { open, close }] = useDisclosure(false);
  const { isPending, error, data } = useQuery({
    queryKey: ["person", personId, "names"],
    queryFn: () =>
      api.persons.indexPersonsPersonIdNamesGet({
        personId,
      }),
  });

  const { t } = useTranslation();

  if (isPending) return t("Loading...");

  if (error) return t("An error has occurred: ") + error.message;

  const rows = data.map((element) => (
    <Table.Tr key={element.use}>
      <Table.Td>{element.family}</Table.Td>
      <Table.Td>{element.given}</Table.Td>
      <Table.Td>{element.middle}</Table.Td>
      <Table.Td>{element.patronymic}</Table.Td>
    </Table.Tr>
  ));

  return (
    <QueryClientProvider client={queryClient}>
      <Card withBorder shadow="sm" radius="md">
        <Card.Section withBorder inheritPadding py="xs">
          <Group justify="space-between">
            <Text fw={500}>{t("Person names")}</Text>

            <Button variant="outline" fw={500} size="compact-sm" onClick={open}>
              {t("Add")}
            </Button>
          </Group>
        </Card.Section>

        <Table>
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
      <Modal opened={opened} onClose={close} title={t("Add new name")}>
        <NameForm onClose={close}  />
      </Modal>
    </QueryClientProvider>
  );
};
