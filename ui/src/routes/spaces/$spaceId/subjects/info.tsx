
 import { Card, Stack, Text, Group, Title, Button } from "@mantine/core";
 import dayjs from "dayjs";

 import { createFileRoute, useLocation, useNavigate } from '@tanstack/react-router'
 import { Breadcrumbs } from "@/components/Breadcrumbs";
import api from "@/api";
export const Route = createFileRoute('/info')({
  component: RouteComponent,
  loader: ({ params }) => api.subjects.showSpacesSpaceIdSubjectsSubjectIdGet(params),
  beforeLoad: ({ params }) => ({
    breadcrumb: `Patient ${params.subjectId}`,
  }),
});


 function RouteComponent() {
  const navigate = useNavigate();
  const { spaceId } = Route.useParams();
  const subject = Route.useLoaderData(); // ← заменили useLocation

  return (
    <Stack gap="md">
      <Breadcrumbs />
      <Group justify="space-between">
        <Title order={2}>Patient Information</Title>
        <Button 
          onClick={() =>
            navigate({ to: "/spaces/$spaceId/subjects", params: { spaceId } })
          }
        >
          Back to List
        </Button>
      </Group>

      <Card withBorder shadow="sm" padding="lg">
        <Stack gap="sm">
          <Group>
            <Text fw={600} w={150}>Full Name:</Text>
            <Text>{subject.performingBiologicEntity?.primaryName?.trim() || 'N/A'}</Text>
          </Group>
          {/* и так далее */}
        </Stack>
      </Card>
    </Stack>
  );
}

