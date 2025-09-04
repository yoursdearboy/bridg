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
      <Card withBorder shadow="sm" radius="md">
        {/* Первая секция с заголовком и кнопкой */}
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

        {/* Вторая секция с контентом и loading */}
        <Card.Section inheritPadding py="xs">
          <div style={{ position: "relative", minHeight: "150px" }}>
            <LoadingOverlay visible={isPending} />

            {isError && (
              <Text color="red">
                {t("errorMessage", { error: error.message })}
              </Text>
            )}

            {!isPending && !isError && (
              <NamesTable personId={personId} names={names} />
            )}
          </div>
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
