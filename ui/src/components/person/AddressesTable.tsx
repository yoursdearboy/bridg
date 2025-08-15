import api from "@/api";
import { Button, Card, Group, Table, Text } from "@mantine/core";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
const queryClient = new QueryClient();

interface AddressesTableProps {
  personId: string;
}

export const AddressesTable = ({ personId }: AddressesTableProps) => {
  const { isPending, error, data } = useQuery({
    queryKey: ["person", personId, "addresses"],
    queryFn: () =>
      api.persons.indexPersonsPersonIdPostalAddressesGet({ personId }),
  });

  const { t } = useTranslation();

  if (isPending) return t("Loading...");

  if (error) return t("An error has occurred: ") + error.message;

  const rows = data.map((element) => (
    <Table.Tr key={element.zip}>
      <Table.Td>{element.country}</Table.Td>
      <Table.Td>{element.state}</Table.Td>
      <Table.Td>{element.street}</Table.Td>
      <Table.Td>{element.building}</Table.Td>
    </Table.Tr>
  ));

  return (
    <QueryClientProvider client={queryClient}>
      <Card withBorder shadow="sm" radius="md">
        <Card.Section withBorder inheritPadding py="xs">
          <Group justify="space-between">
            <Text fw={500}>{t("Person addresses")}</Text>
            <Button
              variant="outline"
              size="compact-sm"
              fw={500}
              onClick={() => console.log("Add new address")}
            >
              {t("Add")}
            </Button>
          </Group>
        </Card.Section>

        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>{t("Country")}</Table.Th>
              <Table.Th>{t("State")}</Table.Th>
              <Table.Th>{t("Street")}</Table.Th>
              <Table.Th>{t("Building")}</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Card>
    </QueryClientProvider>
  );
};
