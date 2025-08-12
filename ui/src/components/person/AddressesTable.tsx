import api from "@/api";
import { Card, Divider, Group, Stack, Table, Text } from "@mantine/core";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { t } from "i18next";
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

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

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
      <Card withBorder shadow="sm" padding="lg" radius="md">
        <Stack gap="sm">
          <Group justify="space-between">
            <Text size="xl" fw={700}>
              {t("Person addresses")}
            </Text>
          </Group>
          <Divider my="xs" />

          <Table>
            <Table.Thead>
              <Table.Tr>
                <Table.Th> {t("Country")}</Table.Th>
                <Table.Th> {t("State")} </Table.Th>
                <Table.Th> {t("Street")} </Table.Th>
                <Table.Th> {t("Building")} </Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
        </Stack>
      </Card>
    </QueryClientProvider>
  );
};
