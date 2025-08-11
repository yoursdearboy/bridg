import { useEffect, useState } from "react";
import api from "@/api";
import { Card, Alert, Stack, Group, Text, Divider, Table } from "@mantine/core";
import { useTranslation } from "react-i18next";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
const queryClient = new QueryClient();

interface NamesTableProps {
  personId: string;
}

export const NamesTable = ({ personId }: NamesTableProps) => {
  const { t } = useTranslation();

  const { isPending, error, data } = useQuery({
    queryFn: () =>
      api.persons
        .indexPersonsPersonIdNamesGet({
          personId,
        })
        .then((res) => res),
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  const rows = data.map((element) => (
    <Table.Tr key={element.name}>
      <Table.Td>{element.family}</Table.Td>
      <Table.Td>{element.given}</Table.Td>
      <Table.Td>{element.middle}</Table.Td>
      <Table.Td>{element.patronymic}</Table.Td>
    </Table.Tr>
  ));

  return (
    <QueryClientProvider client={queryClient}>
      <Card withBorder shadow="sm" padding="lg" radius="md">
        <Stack gap="sm">
          <Group justify="space-between">
            <Text size="xl" fw={700}>
              {t("Person names")}
            </Text>
          </Group>
          <Divider my="xs" />

          <Table>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>{t("Persons.Names.family")}</Table.Th>
                <Table.Th>{t("Persons.Names.given")}</Table.Th>
                <Table.Th>{t("Persons.Names.middle")}</Table.Th>
                <Table.Th>{t("Persons.Names.patronymic")}</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
        </Stack>
      </Card>
    </QueryClientProvider>
  );
};
