import {
  Box,
  Button,
  Card,
  Group,
  LoadingOverlay,
  Modal,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import type { PersonPostalAddress } from "api-ts";
import { useTranslation } from "react-i18next";
import api from "@/api";
import { AddressTable } from "./AddressTable";
import { NewAddressForm } from "./NewAddressForm";

export const AddressCardWrapper = ({ personId }: { personId: string }) => {
  const query = useQuery({
    queryKey: ["person", personId, "address"],
    queryFn: () =>
      api.listPersonPostalAddress({
        personId,
      }),
  });

  return <AddressCard personId={personId} query={query} />;
};

interface AddressCardProps {
  personId: string;
  query: UseQueryResult<PersonPostalAddress[], Error>;
}

export const AddressCard = ({ personId, query }: AddressCardProps) => {
  const [opened, { open, close }] = useDisclosure(false);
  const { t } = useTranslation();

  const { isPending, isError, error, data: addresses } = query;

  return (
    <>
      <Card withBorder shadow="sm" radius="md">
        <Card.Section withBorder inheritPadding py="xs">
          <Group justify="space-between">
            <Text fw={500} px="xs">
              {t("AddressCard.title")}
            </Text>
            <Button variant="outline" size="compact-sm" onClick={open} fw={500}>
              {t("add")}
            </Button>
          </Group>
        </Card.Section>
        <Card.Section inheritPadding py="xs">
          <Box pos="relative" style={{ minHeight: 80 }}>
            <LoadingOverlay visible={isPending} />
            {isError && (
              <Text color="red">
                {t("errorMessage", { error: error.message })}
              </Text>
            )}
            {!isPending && !isError && (
              <AddressTable personId={personId} addresses={addresses} />
            )}
          </Box>
        </Card.Section>
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
