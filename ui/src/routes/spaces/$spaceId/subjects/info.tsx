

import { Card, Stack, Text, Group, Title, Button } from "@mantine/core";
import dayjs from "dayjs";

import { createFileRoute, useLocation, useNavigate } from '@tanstack/react-router'
import { Breadcrumbs } from "@/components/Breadcrumbs";
export const Route = createFileRoute('/spaces/$spaceId/subjects/info')({
  
  component: RouteComponent,
})

function RouteComponent() {



  const location = useLocation();
  const navigate = useNavigate();
  const { spaceId } = Route.useParams();
  
  const subject = location.state?.subject;

  if (!subject) {
    return (
      <Stack>
        <Text>Patient data not found</Text>
        <Button onClick={() => navigate({ to: "/spaces/$spaceId/subjects", params: { spaceId } })}>
          Back to Patients List
        </Button>
      </Stack>
    );
  }

  return (
      <Stack gap="md">
      <Breadcrumbs />
      <Group justify="space-between">
        <Title order={2}>Patient Information</Title>
        <Button onClick={() => navigate({ to: "/spaces/$spaceId/subjects", params: { spaceId } })}>
          Back to List
        </Button>
      </Group>

      <Card withBorder shadow="sm" padding="lg">
        <Stack gap="sm">
          <Group>
            <Text fw={600} w={150}>Full Name:</Text>
            <Text>{subject.performingBiologicEntity?.primaryName?.trim() || 'N/A'}</Text>
          </Group>

          <Group>
            <Text fw={600} w={150}>Gender:</Text>
            <Text>{subject.performingBiologicEntity?.administrativeGenderCode || 'N/A'}</Text>
          </Group>

          <Group>
            <Text fw={600} w={150}>Birth Date:</Text>
            <Text>
              {subject.performingBiologicEntity?.birthDate 
                ? dayjs(subject.performingBiologicEntity.birthDate).format('YYYY-MM-DD')
                : 'N/A'}
            </Text>
          </Group>

          <Group>
            <Text fw={600} w={150}>Status:</Text>
            <Text>{subject.status || 'N/A'}</Text>
          </Group>

          <Group>
            <Text fw={600} w={150}>Status Date:</Text>
            <Text>
              {subject.statusDate 
                ? dayjs(subject.statusDate).format('YYYY-MM-DD')
                : 'N/A'}
            </Text>
          </Group>
        </Stack>
      </Card>
    </Stack>
  );
}
