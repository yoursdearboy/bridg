import api from "@/api";
import { Card, Stack, Group, Text, Divider, Table } from "@mantine/core";
import { useTranslation } from "react-i18next";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
const queryClient = new QueryClient();

interface TelecommunicationAddressesTableProps {
  personId: string;
}

export const TelecommunicationAddressesTable = ({
  personId,
}: TelecommunicationAddressesTableProps) => {
  const { t } = useTranslation();

  const { isPending, error, data } = useQuery({
    queryFn: () =>
      api.persons
        .indexPersonsPersonIdTelecommunicationAddressesGet({
          personId,
        })
        .then((res) => res),
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  const rows = data.map((element) => (
    <Table.Tr key={element.address}>
      <Table.Td>{element.use}</Table.Td>
      <Table.Td>{element.scheme}</Table.Td>
      <Table.Td>{element.address}</Table.Td>
    </Table.Tr>
  ));

  return (
    <QueryClientProvider client={queryClient}>
      <Card withBorder shadow="sm" padding="lg" radius="md">
        <Stack gap="sm">
          <Group justify="space-between">
            <Text size="xl" fw={700}>
              {t("Person telecommunication addresses")}
            </Text>
          </Group>
          <Divider my="xs" />

          <Table>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>
                  {t("Persons.TelecommunicationAddresses.use")}
                </Table.Th>
                <Table.Th>
                  {t("Persons.TelecommunicationAddresses.scheme")}
                </Table.Th>
                <Table.Th>
                  {t("Persons.TelecommunicationAddresses.address")}
                </Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
        </Stack>
      </Card>
    </QueryClientProvider>
  );
};
