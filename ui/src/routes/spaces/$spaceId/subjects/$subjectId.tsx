import api from "@/api";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import ButtonLink from "@/components/ButtonLink";
import { Card, Group, Stack, Text, Title } from "@mantine/core";
import { createFileRoute } from "@tanstack/react-router";
import dayjs from "dayjs";

export const Route = createFileRoute("/spaces/$spaceId/subjects/$subjectId")({
  component: RouteComponent,
  loader: ({ params }) =>
    api.subjects.showSpacesSpaceIdSubjectsSubjectIdGet(params),
  beforeLoad: ({ params }) => ({
    breadcrumb: `(subj)Patient ${params.subjectId}`,
  }),
});

function RouteComponent() {
  const subject = Route.useLoaderData();

  return (
    <Stack gap="md">
      <Group justify="space-between">
        <Title order={2}>Patient Information</Title>
        <ButtonLink to="..">Back to List</ButtonLink>
      </Group>

      <Card withBorder shadow="sm" padding="lg">
        <Stack gap="sm">
          <Group>
            <Text fw={600} w={150}>
              Full Name:
            </Text>
            <Text>
              {subject.performingBiologicEntity?.primaryName?.trim() || "N/A"}
            </Text>
          </Group>

          <Group>
            <Text fw={600} w={150}>
              Gender:
            </Text>
            <Text>
              {subject.performingBiologicEntity?.administrativeGenderCode ||
                "N/A"}
            </Text>
          </Group>

          <Group>
            <Text fw={600} w={150}>
              Birth Date:
            </Text>
            <Text>
              {subject.performingBiologicEntity?.birthDate
                ? dayjs(subject.performingBiologicEntity.birthDate).format(
                    "YYYY-MM-DD"
                  )
                : "N/A"}
            </Text>
          </Group>

          <Group>
            <Text fw={600} w={150}>
              Status:
            </Text>
            <Text>{subject.status || "N/A"}</Text>
          </Group>

          <Group>
            <Text fw={600} w={150}>
              Status Date:
            </Text>
            <Text>
              {subject.statusDate
                ? dayjs(subject.statusDate).format("YYYY-MM-DD")
                : "N/A"}
            </Text>
          </Group>
        </Stack>
      </Card>
    </Stack>
  );
}
