import api from "@/api";
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
import { useTranslation } from "react-i18next";

import type { TelecommunicationAddress } from "api-ts";
import { TelecomTable } from "./TelecomTable";
import { NewTelecomForm } from "./NewTelecomForm";

export const TelecomCardWrapper = ({ personId }: { personId: string }) => {
  const query = useQuery({
    queryKey: ["person", personId, "telecommunication_addresses"],
    queryFn: () =>
      api.persons.indexPersonsPersonIdTelecommunicationAddressesGet({
        personId,
      }),
  });

  return <TelecomCard personId={personId} query={query} />;
};

interface TelecomCardProps {
  personId: string;
  query: UseQueryResult<TelecommunicationAddress[], Error>;
}

export const TelecomCard = ({ personId, query }: TelecomCardProps) => {
  const [opened, { open, close }] = useDisclosure(false);
  const { t } = useTranslation();
  const {
    isPending,
    isError,
    error,
    data: telecommunication_addresses,
  } = query;

  return (
    <>
      <Card withBorder shadow="sm" radius="md">
        <Card.Section withBorder inheritPadding py="xs">
          <Group justify="space-between">
            <Text fw={500} px="xs">
              {t("Telecom.title")}
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
              <TelecomTable
                personId={personId}
                telecom_addresses={telecommunication_addresses}
              />
            )}
          </Box>
        </Card.Section>
      </Card>
      <Modal opened={opened} onClose={close} title={t("add")} size="lg">
        <NewTelecomForm
          personId={personId}
          onCancel={close}
          onSuccess={() => close()}
        />
      </Modal>
    </>
  );
};
