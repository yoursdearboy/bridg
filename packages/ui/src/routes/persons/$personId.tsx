import api from "@/api";
import { AddressesCard } from "@/components/person/address/AddressCard";
import { EditNameForm } from "@/components/person/name/EditNameForm";
import { NamesCardWrapper } from "@/components/person/name/NamesCard";
import { PersonCard } from "@/components/person/PersonCard";
import { TelecommunicationAddressesTable } from "@/components/person/TelecommunicationAddressesTable";
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
import { createFileRoute, useMatch, useRouter } from "@tanstack/react-router";
import type { ApiPersonPerson } from "api-ts";
import { useTranslation } from "react-i18next";

const useRouteQuery = () => {
  const match = useMatch({
    strict: false,
  });
  const ctx = match.context;
  if (!ctx.query) throw new Error("No query");
  return useSuspenseQuery(ctx.query);
};

const loadRouteQuery = ({ context: { query, queryClient } }) =>
  queryClient.fetchQuery(query);

export const Route = createFileRoute("/persons/$personId")({
  component: PersonShowPage,
  loader: loadRouteQuery,
  beforeLoad: ({ params }) => ({
    breadcrumb: ({ loaderData: person }: { loaderData: ApiPersonPerson }) =>
      person.primaryName?.label ||
      i18next.t("PersonShowPage.breadcrumbDefault"),
    query: queryOptions({
      queryKey: ["person", params.personId],
      queryFn: () => api.persons.showPersonsPersonIdGet(params),
    }),
  }),
});

function PersonShowPage() {
  const [opened, { open, close }] = useDisclosure(false);
  const { personId } = Route.useParams();
  const { data: person } = useRouteQuery();

  const { t } = useTranslation();
  const router = useRouter();

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
            <AddressesCard personId={personId} />
            <Space h="md" />
            <TelecommunicationAddressesTable personId={personId} />
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
            onSuccess={() => {
              void router.invalidate();
              close();
            }}
          />
        </Modal>
      )}
    </>
  );
}
