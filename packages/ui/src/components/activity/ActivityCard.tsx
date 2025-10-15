import { Box, Card, Group, Text } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import api from "@/api";
import { ActivityMenu } from "./ActivityMenu";
import { ActivityTableWrapper } from "./ActivityTable";

interface ActivityCardProps {
  spaceId: string;
  subjectId: string;
}

export const ActivityCard = ({ spaceId, subjectId }: ActivityCardProps) => {
  const query = useQuery({
    queryKey: ["space", spaceId, "subject", subjectId, "observations"],
    queryFn: () =>
      api.subjects.indexSpacesSpaceIdSubjectsSubjectIdObservationGet({
        spaceId,
        subjectId,
      }),
  });
  return (
    <>
      <Card withBorder shadow="sm" radius="md">
        <Card.Section withBorder inheritPadding py="xs">
          <Group justify="space-between">
            <Text fw={500} px="xs">
              Activity
            </Text>
            <ActivityMenu spaceId={spaceId} subjectId={subjectId} />
          </Group>
        </Card.Section>
        <Card.Section inheritPadding py="xs">
          <Box pos="relative" style={{ minHeight: 80 }}>
            <ActivityTableWrapper query={query} />
          </Box>
        </Card.Section>
      </Card>
    </>
  );
};
