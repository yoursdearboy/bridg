import api from "@/api";
import {
  Button,
  Card,
  Group,
  LoadingOverlay,
  Modal,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import type { PostalAddress } from "api-ts";
import { NewAddressForm } from "./NewAddressForm";
import { AddressTable } from "./AddressTable";

export const AddressCardWrapper = ({ personId }: { personId: string }) => {
  const query = useQuery({
    queryKey: ["person", personId, "addresses"],
    queryFn: () =>
      api.persons.indexPersonsPersonIdPostalAddressesGet({
        personId,
      }),
  });

  return <AddressCard personId={personId} query={query} />;
};

interface AddressCardProps {
  personId: string;
  query: UseQueryResult<PostalAddress[], Error>;
}

export const AddressCard = ({ personId, query }: AddressCardProps) => {
  const [opened, { open, close }] = useDisclosure(false);
  const { t } = useTranslation();

  const { isPending, isError, error, data: addresses } = query;

  // FIXME: Must be inside Card.Section
  if (isPending) return <LoadingOverlay visible />;

  // FIXME: Must be inside Card.Section
  if (isError) {
    return (
      <Text color="red">{t("errorMessage", { error: error.message })}</Text>
    );
  }

  return (
    <>
      <Card withBorder shadow="sm" radius="md" padding="xs">
        <Card.Section withBorder inheritPadding py="xs">
          <Group justify="space-between">
            <Text fw={500} px="xs">
              {t("NamesCard.title")}
            </Text>
            <Button variant="outline" size="compact-sm" onClick={open} fw={500}>
              {t("add")}
            </Button>
          </Group>
        </Card.Section>
        <AddressTable personId={personId} addresses={addresses} />
      </Card>
      <Modal opened={opened} onClose={close} title={t("add")} size="lg">
        <NewAddressForm
          personId={personId}
          onCancel={close}
          onSuccess={() => close()}
        />
      </Modal>
    </>
  );
};
