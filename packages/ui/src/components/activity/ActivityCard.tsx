import { Box, Card, Group, Text } from "@mantine/core";
import { ActivityMenu } from "./ActivityMenu";

interface ActivityCardProps {
  spaceId: string,
  subjectId: string
}

export const ActivityCard = ({ spaceId, subjectId }: ActivityCardProps) => {
  return (
    <>
      <Card withBorder shadow="sm" radius="md">
        <Card.Section withBorder inheritPadding py="xs">
          <Group justify="space-between">
            <Text fw={500} px="xs">
              Activity
            </Text>
            <ActivityMenu spaceId={spaceId} subjectId={subjectId}/>
          </Group>
        </Card.Section>
        <Card.Section inheritPadding py="xs">
          <Box pos="relative" style={{ minHeight: 80 }}></Box>
        </Card.Section>
      </Card>
    </>
  );
};
