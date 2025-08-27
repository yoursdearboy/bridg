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
import {
  useQuery,
  useQueryClient,
  type UseQueryResult,
} from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { NamesTable } from "./NamesTable";
import { NewNameForm } from "./NewNameForm";
import type { EntityName } from "api-ts";

export const NamesCardWrapper = ({ personId }: { personId: string }) => {
  const queryClient = useQueryClient();

  const queryKey = ["person", personId, "names"];

  const query = useQuery({
    queryKey,
    queryFn: () =>
      api.persons.indexPersonsPersonIdNamesGet({
        personId,
      }),
  });

  const invalidateQuery = () => {
    queryClient
      .invalidateQueries({ queryKey })
      .then(close)
      .catch((err) => console.error("Query invalidation failed:", err));
  };

  return (
    <NamesCard
      personId={personId}
      query={query}
      invalidateQuery={invalidateQuery}
    />
  );
};

interface NamesCardProps {
  personId: string;
  query: UseQueryResult<EntityName[], Error>;
  invalidateQuery: () => void;
}

export const NamesCard = ({
  personId,
  query,
  invalidateQuery,
}: NamesCardProps) => {
  const [opened, { open, close }] = useDisclosure(false);
  const { t } = useTranslation();

  const { isPending, isError, error, data: names } = query;

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
      <Card withBorder shadow="sm" radius="md">
        <Card.Section withBorder inheritPadding py="xs">
          <Group justify="space-between">
            <Text fw={500}>{t("NamesCard.title")}</Text>
            <Button variant="outline" size="compact-sm" onClick={open} fw={500}>
              {t("add")}
            </Button>
          </Group>
        </Card.Section>
        <NamesTable
          personId={personId}
          names={names}
          invalidateQuery={invalidateQuery}
        />
      </Card>
      <Modal
        opened={opened}
        onClose={close}
        title={t("add")}
        size="lg"
        centered
      >
        <NewNameForm
          personId={personId}
          onCancel={close}
          onSuccess={() => {
            close();
            invalidateQuery();
          }}
        />
      </Modal>
    </>
  );
};
