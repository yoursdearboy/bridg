import api from "@/api";
import ButtonLink from "@/components/ButtonLink";
import { Group, Stack, Table, Text } from "@mantine/core";
import { createFileRoute } from "@tanstack/react-router";
import dayjs from "dayjs";
import { Route as infoRoute } from "./$subjectId";
import { Route as newRoute } from "./new";

export const Route = createFileRoute("/spaces/$spaceId/subjects/")({
  loader: ({ params }) => api.subjects.indexSpacesSpaceIdSubjectsGet(params),
  component: RouteComponent,
  beforeLoad: () => ({
    breadcrumb: null,
  }),
});

function RouteComponent() {
  const subjects = Route.useLoaderData();
  const { spaceId } = Route.useParams();

  const rows = subjects.map((subject) => (
    <Table.Tr key={subject.id}>
      <Table.Td>
        <Text>{subject.performingBiologicEntity?.id?.trim()}</Text>
      </Table.Td>
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
        <Text>
          {subject.performingBiologicEntity?.deathIndicator === true
            ? "Yes"
            : "No"}
        </Text>
      </Table.Td>
      <Table.Td>
        {subject.performingBiologicEntity?.deathDate
          ? dayjs(subject.performingBiologicEntity.deathDate).format(
              "YYYY-MM-DD"
            )
          : "N/A"}
      </Table.Td>
      <Table.Td>
        <Text>{subject.status?.trim()}</Text>
      </Table.Td>
      <Table.Td>
        {subject.statusDate
          ? dayjs(subject.statusDate).format("YYYY-MM-DD")
          : "N/A"}
      </Table.Td>
      <Table.Td>
        <ButtonLink
          to={infoRoute.to}
          params={{ spaceId, subjectId: subject.id }}
        >
          View
        </ButtonLink>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Stack gap="md">
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
              <Table.Th>ID</Table.Th>
              <Table.Th>Name</Table.Th>
              <Table.Th>Gender</Table.Th>
              <Table.Th>Birth Date</Table.Th>
              <Table.Th>Death Indicator</Table.Th>
              <Table.Th>Death date</Table.Th>
              <Table.Th>Status</Table.Th>
              <Table.Th>Status date</Table.Th>
              <Table.Th>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Table.ScrollContainer>
    </Stack>
  );
}