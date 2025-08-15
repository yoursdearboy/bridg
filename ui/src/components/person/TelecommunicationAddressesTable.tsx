import api from "@/api";
import {
  Button,
  Card,
  Divider,
  Group,
  Stack,
  Table,
  Text,
} from "@mantine/core";
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

  if (isPending) return t("Loading...");

  if (error) return t("An error has occurred: ") + error.message;

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
            <Button
              variant="outline"
              onClick={() => console.log("Add new telecommunication address")}
            >
              {t("Add")}
            </Button>
          </Group>
          <Divider my="xs" />

          <Table>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>{t("Use")}</Table.Th>
                <Table.Th>{t("Scheme")}</Table.Th>
                <Table.Th>{t("Address")}</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
        </Stack>
      </Card>
    </QueryClientProvider>
  );
};
