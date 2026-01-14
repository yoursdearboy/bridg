import { Box, Card, Group, Text } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import api from "@/api";
import { ActivityMenu } from "./ActivityMenu";
import { ActivityTableWrapper } from "./ActivityTable";

interface ActivityCardProps {
  spaceId: string;
  subjectId: string;
}

export const ActivityCard = ({ spaceId, subjectId }: ActivityCardProps) => {
  const { t } = useTranslation();
  const query = useQuery({
    queryKey: ["space", spaceId, "subject", subjectId, "activity"],
    queryFn: () =>
      api.subjects.indexSpaceSpaceIdSubjectSubjectIdActivityGet({
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
              {t("ActivityCard.title")}
            </Text>
            <ActivityMenu spaceId={spaceId} subjectId={subjectId} />
          </Group>
        </Card.Section>
        <Card.Section inheritPadding py="xs">
          <Box pos="relative" style={{ minHeight: 80 }}>
            <ActivityTableWrapper
              query={query}
              spaceId={spaceId}
              subjectId={subjectId}
            />
          </Box>
        </Card.Section>
      </Card>
    </>
  );
};
