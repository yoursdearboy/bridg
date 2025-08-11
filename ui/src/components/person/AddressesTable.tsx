import api from "@/api";
import { Card, Stack, Group, Text, Divider, Table } from "@mantine/core";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
const queryClient = new QueryClient();

interface AddressesTableProps {
  personId: string;
}

export const AddressesTable = ({ personId }: AddressesTableProps) => {
  const { isPending, error, data } = useQuery({
    queryKey: ["fetchPersonAddresses"],
    queryFn: () =>
      api.persons
        .indexPersonsPersonIdPostalAddressesGet({
          personId,
        })
        .then((res) => res),
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
              Person addresses
            </Text>
          </Group>
          <Divider my="xs" />

          <Table>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Country</Table.Th>
                <Table.Th>State</Table.Th>
                <Table.Th>Street</Table.Th>
                <Table.Th>Building</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
        </Stack>
      </Card>
    </QueryClientProvider>
  );
};
