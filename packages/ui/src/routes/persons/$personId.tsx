import api from "@/api";
import ButtonLink from "@/components/ButtonLink";
import { AddressesCard } from "@/components/person/address/AddressCard";
import { PersonCard } from "@/components/person/PersonCard";
import { TelecommunicationAddressesTable } from "@/components/person/TelecommunicationAddressesTable";
import { Button, Grid, Group, Modal, Space, Stack, Title } from "@mantine/core";
import { createFileRoute } from "@tanstack/react-router";
import type { PersonOutput } from "api-ts";
import { Route as editRoute } from "./$personId/edit";
import { useTranslation } from "react-i18next";
import { NamesCardWrapper } from "@/components/person/name/NamesCard";
import i18next from "@/i18n";
import { useDisclosure } from "@mantine/hooks";
import { EditNameForm } from "@/components/person/name/EditNameForm";

export const Route = createFileRoute("/persons/$personId")({
  component: PersonShowPage,
  loader: ({ params }) => api.persons.showPersonsPersonIdGet(params),
  beforeLoad: () => ({
    breadcrumb: ({ loaderData: person }: { loaderData: PersonOutput }) =>
      person.primaryName?.label ||
      i18next.t("PersonShowPage.breadcrumbDefault"),
  }),
});

function PersonShowPage() {
  const [opened, { open, close }] = useDisclosure(false);
  const { personId } = Route.useParams();
  const person = Route.useLoaderData();
  const handleEdit = () => {
    open();
  };
  const { t } = useTranslation();

  return (
    <>
      <Stack gap="md">
        <Group justify="space-between">
          <Title fw={500} order={2}>
            {person.primaryName?.label}
          </Title>
          <Group gap="xs" align="flex-end">
            <ButtonLink
              to={editRoute.to}
              params={{ personId }}
              variant="outline"
            >
              {t("PersonShowPage.edit")}
            </ButtonLink>
            <Button onClick={handleEdit}>{t("PersonShowPage.rename")}</Button>
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
            onSuccess={() => close()}
          />
        </Modal>
      )}
    </>
  );
}
