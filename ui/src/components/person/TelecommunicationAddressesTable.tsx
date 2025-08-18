import api from "@/api";
import { Button, Card, Group, Table, Text } from "@mantine/core";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
const queryClient = new QueryClient();

interface TelecommunicationAddressesTableProps {
  personId: string;
}

export const TelecommunicationAddressesTable = ({
  personId,
}: TelecommunicationAddressesTableProps) => {
  const { isPending, error, data } = useQuery({
    queryKey: ["persons", personId, "telecommunicationAddresses"],
    queryFn: () =>
      api.persons.indexPersonsPersonIdTelecommunicationAddressesGet({
        personId,
      }),
  });

  const { t } = useTranslation();

  if (isPending) return t("loading");

  if (error) return t("errorMessage", { error: error.message });

  const rows = data.map((element) => (
    <Table.Tr key={element.address}>
      <Table.Td>{element.use}</Table.Td>
      <Table.Td>{element.scheme}</Table.Td>
      <Table.Td>{element.address}</Table.Td>
    </Table.Tr>
  ));

  return (
    <QueryClientProvider client={queryClient}>
      <Card withBorder shadow="sm" radius="md">
        <Card.Section withBorder inheritPadding py="xs">
          <Group justify="space-between">
            <Text fw={500}>{t("TelecommunicationAddressesTable.title")}</Text>
            <Button
              variant="outline"
              fw={500}
              size="compact-sm"
              onClick={() => console.log("Add new telecommunication address")}
            >
              {t("add")}
            </Button>
          </Group>
        </Card.Section>

        <Table>
          <Table.Thead>
            <Table.Tr>
               <Table.Th>{t("TelecommunicationAddress.use")}</Table.Th>
              <Table.Th>{t("TelecommunicationAddress.scheme")}</Table.Th>
              <Table.Th>{t("TelecommunicationAddress.address")}</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Card>
    </QueryClientProvider>
  );
};
