import api from "@/api";
import ButtonLink from "@/components/ButtonLink";
import { AddressesTable } from "@/components/person/AddressesTable";
import { PersonCard } from "@/components/person/PersonCard";
import { TelecommunicationAddressesTable } from "@/components/person/TelecommunicationAddressesTable";
import { Grid, Group, Space, Stack, Title } from "@mantine/core";
import { createFileRoute } from "@tanstack/react-router";
import type { PersonOutput } from "bridg-ts";
import { Route as editRoute } from "./edit";
import { useTranslation } from "react-i18next";
import { NamesCard } from "@/components/person/name/NamesCard";

export const Route = createFileRoute("/persons/$personId/")({
  component: PersonViewComponent,
  loader: ({ params }) => api.persons.showPersonsPersonIdGet(params),
  beforeLoad: () => ({
    breadcrumb: ({ loaderData: person }: { loaderData: PersonOutput }) =>
      person.primaryName || "Anonymous person",
  }),
});

function PersonViewComponent() {
  const { personId } = Route.useParams();
  const person = Route.useLoaderData();

  const { t } = useTranslation();

  return (
    <Stack gap="md">
      <Group justify="space-between">
        <Title fw={500} order={2}>
          {t("PersonShowPage.title")}
        </Title>
        <ButtonLink to={editRoute.to} params={{ personId }} variant="outline">
          {t("PersonShowPage.edit")}
        </ButtonLink>
      </Group>

      <Grid>
        <Grid.Col span={{ base: 12, md: 4 }}>
          <PersonCard person={person} />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 8 }}>
          <NamesCard personId={personId} />
          <Space h="md" />
          <AddressesTable personId={personId} />
          <Space h="md" />
          <TelecommunicationAddressesTable personId={personId} />
        </Grid.Col>
      </Grid>
    </Stack>
  );
}
