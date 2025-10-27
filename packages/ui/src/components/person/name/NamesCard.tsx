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
import { IconCaretDownFilled, IconCaretUpFilled } from "@tabler/icons-react";
import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import type { EntityName } from "api-ts";
import { useTranslation } from "react-i18next";
import api from "@/api";
import { NamesTable } from "./NamesTable";
import { NewNameForm } from "./NewNameForm";

export const NamesCardWrapper = ({ personId }: { personId: string }) => {
  const query = useQuery({
    queryKey: ["person", personId, "names"],
    queryFn: () =>
      api.persons.indexPersonsPersonIdNamesGet({
        personId,
      }),
  });

  return <NamesCard personId={personId} query={query} />;
};

interface NamesCardProps {
  personId: string;
  query: UseQueryResult<EntityName[], Error>;
}

export const NamesCard = ({ personId, query }: NamesCardProps) => {
  const [modalOpened, { open: modalOpen, close: modalClose }] =
    useDisclosure(false);
  const [cardOpened, { toggle: cardToggle }] = useDisclosure(false);
  const { t } = useTranslation();
  const { isPending, isError, error, data: names } = query;

  return (
    <>
      <Card withBorder shadow="sm" radius="md">
        <Card.Section withBorder inheritPadding py="xs" onClick={cardToggle}>
          <Group justify="space-between">
            <Group px="xs" gap="xs">
              <Text fw={500}>{t("NamesCard.title")}</Text>
              {cardOpened ? <IconCaretUpFilled /> : <IconCaretDownFilled />}
            </Group>
            <Button
              variant="outline"
              size="compact-sm"
              onClick={modalOpen}
              fw={500}
            >
              {t("add")}
            </Button>
          </Group>
        </Card.Section>
        {cardOpened && (
          <Card.Section inheritPadding py="xs">
            <Box pos="relative" style={{ minHeight: 80 }}>
              <LoadingOverlay visible={isPending} />
              {isError && (
                <Text color="red">
                  {t("errorMessage", { error: error.message })}
                </Text>
              )}
              {!isPending && !isError && (
                <NamesTable personId={personId} names={names} />
              )}
            </Box>
          </Card.Section>
        )}
      </Card>
      <Modal
        opened={modalOpened}
        onClose={modalClose}
        title={t("add")}
        size="lg"
      >
        <NewNameForm
          personId={personId}
          onCancel={modalClose}
          onSuccess={() => modalClose()}
        />
      </Modal>
    </>
  );
};
