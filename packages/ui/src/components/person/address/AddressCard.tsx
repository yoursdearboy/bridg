import api from "@/api";
import { Button, Card, Group, Text } from "@mantine/core";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { AddressesTable } from "./AddressTable";
import { useTranslation } from "react-i18next";

interface AddressesTableProps {
  personId: string;
}

export const AddressesCard = ({ personId }: AddressesTableProps) => {
  const queryClient = useQueryClient();

  const {
    isPending,
    isError,
    error,
    data: addresses = [],
  } = useQuery({
    queryKey: ["person", personId, "addresses"],
    queryFn: () =>
      api.persons.indexPersonsPersonIdPostalAddressesGet({ personId }),
  });

  const { t } = useTranslation();

  const handleSuccess = () => {
    queryClient
      .invalidateQueries({
        queryKey: ["person", personId, "postalAddresses"],
      })
      .then(close)
      .catch((err) => console.error("Query invalidation failed:", err));
  };

  if (isPending) return t("loading");

  if (isError) {
    return (
      <Text color="red">{t("errorMessage", { error: error.message })}</Text>
    );
  }

  return (
    <>
      <Card withBorder shadow="sm" radius="md">
        <Card.Section withBorder inheritPadding py="xs">
          <Group justify="space-between">
            <Text fw={500}>{t("AddressesTable.title")}</Text>
            <Button
              variant="outline"
              size="compact-sm"
              fw={500}
              onClick={() => console.log("Add new address")}
            >
              {t("add")}
            </Button>
          </Group>
        </Card.Section>
        <AddressesTable
          addresses={addresses}
          personId={personId}
          onDeleteSuccess={handleSuccess}
        />
      </Card>
    </>
  );
};
