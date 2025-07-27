import api from "@/api";
import ButtonLink from "@/components/ButtonLink";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Route as newRoute } from "./new";
import { Route as infoRoute } from "./info";
import { Table, Text, Group, Stack, Button } from "@mantine/core";
import dayjs from "dayjs";

export const Route = createFileRoute("/spaces/$spaceId/subjects/")({
  loader: ({ params }) => api.subjects.indexSpacesSpaceIdSubjectsGet(params),
  component: RouteComponent,
  beforeLoad: () => ({
    title: "Patients",
  }),
});

function RouteComponent() {
  const subjects = Route.useLoaderData();
  const { spaceId } = Route.useParams();
  const navigate = useNavigate();

  const rows = subjects.map((subject) => (
    <Table.Tr key={subject.id}>
      <Table.Td>
        <Text>{subject.performingBiologicEntity?.primaryName?.trim()}</Text>
      </Table.Td>
      <Table.Td>
        {subject.performingBiologicEntity?.administrativeGenderCode}
      </Table.Td>
      <Table.Td>
        {subject.performingBiologicEntity?.birthDate
          ? dayjs(subject.performingBiologicEntity.birthDate).format(
              "YYYY-MM-DD"
            )
          : "N/A"}
      </Table.Td>
      <Table.Td>
        <Button
          onClick={() =>
            navigate({
              to: infoRoute.to,
              params: { spaceId },
              state: { subject },
            })
          }
        >
          Info
        </Button>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Stack gap="md">
      <Breadcrumbs />

      <Group justify="space-between">
        <Text size="xl" fw={700}>
          Patients
        </Text>
        <ButtonLink from={Route.to} to={newRoute.to} params={{ spaceId }}>
          New Patient
        </ButtonLink>
      </Group>

      <Table.ScrollContainer minWidth={800}>
        <Table striped highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Name</Table.Th>
              <Table.Th>Gender</Table.Th>
              <Table.Th>Birth Date</Table.Th>
              <Table.Th>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Table.ScrollContainer>
    </Stack>
  );
}
