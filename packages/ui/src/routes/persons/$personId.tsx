import api from "@/api";
import { EditNameForm } from "@/components/person/name/EditNameForm";
import { NamesCardWrapper } from "@/components/person/name/NamesCard";
import { AddressCardWrapper } from "@/components/person/address/AddressCard";
import { PersonCard } from "@/components/person/PersonCard";
import { TelecomCardWrapper } from "@/components/person/telecom/TelecomCard";
import i18next from "@/i18n";
import {
  Button,
  Grid,
  Group,
  Menu,
  Modal,
  Space,
  Stack,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconChevronDown, IconPencil } from "@tabler/icons-react";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import type { Person } from "api-ts";
import { useTranslation } from "react-i18next";

export const Route = createFileRoute("/persons/$personId")({
  component: PersonShowPage,
  beforeLoad: ({ params }) => ({
    breadcrumb: ({ loaderData: person }: { loaderData: Person }) =>
      person.primaryName?.label ||
      i18next.t("PersonShowPage.breadcrumbDefault"),
    query: queryOptions({
      queryKey: ["person", params.personId],
      queryFn: () => api.persons.showPersonsPersonIdGet(params),
    }),
  }),
  loader: ({ context: { query, queryClient } }) =>
    queryClient.fetchQuery(query),
});

function PersonShowPage() {
  const [opened, { open, close }] = useDisclosure(false);
  const { personId } = Route.useParams();
  const { query } = Route.useRouteContext();
  const { data: person } = useSuspenseQuery(query);

  const { t } = useTranslation();

  return (
    <>
      <Stack gap="md">
        <Group justify="space-between">
          <Title fw={500} order={2}>
            {person.primaryName?.label || t("PersonShowPage.breadcrumbDefault")}
          </Title>
          <Group gap="xs" align="flex-end">
            <Menu shadow="md" width={200} position="bottom-end">
              <Menu.Target>
                <Button
                  variant="outline"
                  rightSection={<IconChevronDown size={16} />}
                >
                  {t("PersonShowPage.actions")}
                </Button>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Item
                  leftSection={<IconPencil size={14} />}
                  onClick={open}
                >
                  {t("PersonShowPage.rename")}
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
        </Group>

        <Grid>
          <Grid.Col span={{ base: 12, md: 4 }}>
            <PersonCard person={person} />
            <Space h="md" />
            <NamesCardWrapper personId={personId} />
            <Space h="md" />
            <AddressCardWrapper personId={personId} />
            <Space h="md" />
            <TelecomCardWrapper personId={personId} />
          </Grid.Col>
        </Grid>
      </Stack>
      {person.primaryName && (
        <Modal
          opened={opened}
          onClose={close}
          title={t("PersonShowPage.rename")}
          size="lg"
        >
          <EditNameForm
            personId={personId}
            name={person.primaryName}
            onCancel={close}
            onSuccess={close}
          />
        </Modal>
      )}
    </>
  );
}