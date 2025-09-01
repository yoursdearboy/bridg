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
import { NamesTable } from "./NamesTable";
import { NewNameForm } from "./NewNameForm";
import type { EntityName } from "api-ts";

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
  const [opened, { open, close }] = useDisclosure(false);
  const { t } = useTranslation();
  const { isPending, isError, error, data: names } = query;

  return (
    <>
      <Card withBorder shadow="sm" radius="md" padding="xs">
        <Card.Section withBorder inheritPadding py="xs">
          {isPending && <LoadingOverlay visible />}
          {isError && (
            <Text color="red">
              {t("errorMessage", { error: error.message })}
            </Text>
          )}
          {!isPending && !isError && (
            <>
              <Group justify="space-between">
                <Text fw={500} px="xs">
                  {t("NamesCard.title")}
                </Text>
                <Button
                  variant="outline"
                  size="compact-sm"
                  onClick={open}
                  fw={500}
                >
                  {t("add")}
                </Button>
              </Group>
              <NamesTable personId={personId} names={names} />
            </>
          )}
        </Card.Section>
      </Card>
      <Modal opened={opened} onClose={close} title={t("add")} size="lg">
        <NewNameForm
          personId={personId}
          onCancel={close}
          onSuccess={() => close()}
        />
      </Modal>
    </>
  );
};
