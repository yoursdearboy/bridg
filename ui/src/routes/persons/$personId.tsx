import api from "@/api";
import { AddressesTable } from "@/components/person/AddressesTable";
import { NamesTable } from "@/components/person/NamesTable";
import { PersonCard } from "@/components/person/PersonCard";
import { TelecommunicationAddressesTable } from "@/components/person/TelecommunicationAddressesTable";
import { Grid, Group, Stack, Title, Space } from "@mantine/core";
import { createFileRoute } from "@tanstack/react-router";
import type { PersonOutput } from "bridg-ts";

export const Route = createFileRoute("/persons/$personId")({
  component: RouteComponent,
  loader: ({ params }) => api.persons.showPersonsPersonIdGet(params),
  beforeLoad: () => ({
    breadcrumb:
      ({ loaderData: person }: { loaderData: PersonOutput }) =>
        person.primaryName || "Anonymous person",
  }),
});

function RouteComponent() {
  const { personId } = Route.useParams();
  const person = Route.useLoaderData();

  return (
    <Stack gap="md">
      <Group justify="space-between">
        <Title order={2}>Person information</Title>
      </Group>
      <Grid>
        <Grid.Col span={{ base: 12, md: 4 }}>
          <PersonCard person={person} />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 8 }}>
          <NamesTable personId={personId} />
          <Space h="md"/>
          <AddressesTable personId={personId} />
          <Space h="md" />
          <TelecommunicationAddressesTable personId={personId} />
        </Grid.Col>
      </Grid>
    </Stack>
  );
}
