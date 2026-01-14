import { Box, Card, Group, Text } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import api from "@/api";
import { SpecimenTableWrapper } from "./SpecimenTable";

interface SpecimenCardProps {
  spaceId: string;
  subjectId: string;
}

export const SpecimenCard = ({ spaceId, subjectId }: SpecimenCardProps) => {
  const { t } = useTranslation();
  const query = useQuery({
    queryKey: ["space", spaceId, "subject", subjectId, "specimen"],
    queryFn: () =>
      api.subjects.indexSpaceSpaceIdSubjectSubjectIdSpecimenGet({
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
              {t("SpecimenCard.title")}
            </Text>
          </Group>
        </Card.Section>
        <Card.Section inheritPadding py="xs">
          <Box pos="relative" style={{ minHeight: 80 }}>
            <SpecimenTableWrapper
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
