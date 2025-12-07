import { Button, Card, Group, LoadingOverlay, Text } from "@mantine/core";
import {
  IconArrowsDiagonal2,
  IconArrowsDiagonalMinimize,
} from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { useState, type Dispatch, type SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import api from "@/api";
import { ActivityMenu } from "@/components/activity/ActivityMenu";
import { ActivitiesTable } from "./ActivityTable";

export function ActivityCard({
  personId,
  spaceId,
  subjectId,
}: {
  personId: string;
  spaceId?: string;
  subjectId?: string;
}) {
  const [showAll, toggleShowAll] = useState(spaceId ? false : true);
  return (
    <ResponsiveTable
      showAll={showAll}
      toggleShowAll={toggleShowAll}
      personId={personId}
      spaceId={spaceId}
      subjectId={subjectId}
    />
  );
}

interface ResponsiveTableProps {
  showAll: boolean;
  toggleShowAll: Dispatch<SetStateAction<boolean>>;
  personId: string;
  spaceId?: string;
  subjectId?: string;
}

const ResponsiveTable = ({
  showAll,
  toggleShowAll,
  personId,
  spaceId,
  subjectId,
}: ResponsiveTableProps) => {
  const { t } = useTranslation();

  const query = useQuery({
    queryKey: ["person", personId, "subject", showAll, "activity"],
    queryFn: async () => {
      let subjects = await api.persons.indexPersonsPersonIdSubjectGet({
        personId,
      });
      if (spaceId && !showAll) {
        subjects = subjects.filter(
          (subject) =>
            subject.assignedStudySiteProtocolVersionRelationship[0]
              .executedStudyProtocolVersion.id == spaceId
        );
      }
      const activitiesPromises = subjects.map(async (subject) => {
        const subjectActivitiesPromises =
          await api.subjects.indexSpacesSpaceIdSubjectsSubjectIdActivityGet({
            spaceId:
              subject.assignedStudySiteProtocolVersionRelationship[0]
                .executedStudyProtocolVersion.id,
            subjectId: subject.id,
          });
        const subjectActivities = subjectActivitiesPromises.flat();

        return { subject, activities: subjectActivities };
      });
      const activitiesArrays = await Promise.all(activitiesPromises);
      const activities = activitiesArrays.flat();

      return activities;
    },
  });
  const { isPending, isError, error, data: subjectWActivities } = query;
  if (isError)
    return (
      <Text color="red">{t("errorMessage", { error: error.message })}</Text>
    );
  if (isPending) return <LoadingOverlay />;

  return (
    <>
      <Card withBorder shadow="sm" radius="md" padding="xs">
        <Card.Section withBorder inheritPadding py="xs">
          <Group justify="space-between">
            <Text fw={500} px="xs">
              {t("ActivityCard.title")}
            </Text>
            {spaceId && subjectId && (
              <Group>
                <Button
                  variant="outline"
                  onClick={() => toggleShowAll(!showAll)}
                  size="compact-sm"
                  color="gray"
                  leftSection={
                    showAll ? (
                      <IconArrowsDiagonalMinimize />
                    ) : (
                      <IconArrowsDiagonal2 />
                    )
                  }
                >
                  {showAll
                    ? t("ActivityCard.showLess")
                    : t("ActivityCard.showAll")}
                </Button>
                <ActivityMenu spaceId={spaceId} subjectId={subjectId} />
              </Group>
            )}
          </Group>
        </Card.Section>

        <Card.Section withBorder inheritPadding py="xs">
          <ActivitiesTable
            subjectWActivities={subjectWActivities}
            showAll={showAll}
            spaceId={spaceId}
          />
        </Card.Section>
      </Card>
    </>
  );
};
