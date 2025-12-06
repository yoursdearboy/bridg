import {
  Button,
  Card,
  Group,
  LoadingOverlay,
  Table,
  Text,
} from "@mantine/core";
import { useHover } from "@mantine/hooks";
import {
  IconArrowsDiagonal2,
  IconArrowsDiagonalMinimize,
  IconPencil,
} from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import type { PerformedActivity, PersonStudySubject } from "api-ts";
import { useState, type Dispatch, type SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import api from "@/api";
import { Route as EditActivityRoute } from "@/routes/spaces/$spaceId/subjects/$subjectId/activities/$obsId.edit";

export function ActivityCard({
  personId,
  spaceId,
}: {
  personId: string;
  spaceId: string | null;
}) {
  const [showAll, toggleShowAll] = useState(spaceId ? false : true);
  return (
    <ResponsiveTable
      showAll={showAll}
      toggleShowAll={toggleShowAll}
      personId={personId}
      spaceId={spaceId}
    />
  );
}

interface ResponsiveTableProps {
  showAll: boolean;
  toggleShowAll: Dispatch<SetStateAction<boolean>>;
  personId: string;
  spaceId: string | null;
}

const ResponsiveTable = ({
  showAll,
  toggleShowAll,
  personId,
  spaceId,
}: ResponsiveTableProps) => {
  const { t } = useTranslation();

  const query = useQuery({
    queryKey: ["person", personId, "subjects", showAll, "activities"],
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
            {spaceId ? (
              <Button
                variant={"outline"}
                onClick={() => toggleShowAll(!showAll)}
                size="compact-sm"
                color={"gray"}
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
            ) : null}
          </Group>
        </Card.Section>

        <Card.Section withBorder inheritPadding py="xs">
          <Table highlightOnHover>
            <Table.Thead>
              <Table.Tr>
                <Table.Th></Table.Th>
                <Table.Th>{t("Activity.containingEpoch")}</Table.Th>
                <Table.Th>{t("Activity.statusDate")}</Table.Th>
                <Table.Th>{t("Activity.statusCode")}</Table.Th>
                <Table.Th></Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {subjectWActivities.map(({ subject, activities }) => (
                <SubjectActivities
                  subject={subject}
                  activities={activities}
                  showAll={showAll}
                  spaceId={spaceId}
                />
              ))}
            </Table.Tbody>
          </Table>
        </Card.Section>
      </Card>
    </>
  );
};

const SubjectActivities = ({
  subject,
  activities,
  showAll,
  spaceId,
}: {
  subject: PersonStudySubject;
  activities: PerformedActivity[];
  showAll: boolean;
  spaceId: string | null;
}) => {
  const sameSpace =
    !!spaceId &&
    spaceId ===
      subject.assignedStudySiteProtocolVersionRelationship[0]
        .executedStudyProtocolVersion.id;

  return (
    <>
      {activities.map((activity) => (
        <ActivityRow
          spaceId={spaceId}
          subjectId={subject.id}
          activity={activity}
          showAll={showAll}
          sameSpace={sameSpace}
        />
      ))}
    </>
  );
};

interface activityRowProps {
  spaceId: string | null;
  subjectId: string;
  activity: PerformedActivity;
  showAll: boolean;
  sameSpace: boolean;
}

const ActivityRow = ({
  spaceId,
  subjectId,
  activity,
  showAll,
  sameSpace,
}: activityRowProps) => {
  const { t } = useTranslation();
  const { hovered, ref } = useHover();

  return (
    <Table.Tr
      ref={ref}
      bg={showAll && sameSpace ? "var(--mantine-color-blue-light)" : undefined}
    >
      <Table.Td>
        {activity.instantiatedDefinedActivity?.nameCode.displayName ||
          t("Activity.defaultLabel")}
      </Table.Td>
      <Table.Td>{activity.containingEpoch?.name}</Table.Td>
      <Table.Td>{t("intlDateTime", { val: activity.statusDate })}</Table.Td>
      <Table.Td>{activity.statusCode?.displayName}</Table.Td>
      <EditColumn
        hovered={hovered}
        spaceId={spaceId}
        subjectId={subjectId}
        obsId={activity.id}
        sameSpace={sameSpace}
      />
    </Table.Tr>
  );
};

interface EditColumnProps {
  hovered: boolean;
  spaceId: string | null;
  subjectId: string;
  obsId: string;
  sameSpace: boolean;
}

const EditColumn = ({
  hovered,
  spaceId,
  subjectId,
  obsId,
  sameSpace,
}: EditColumnProps) => {
  if (!spaceId) {
    return <Table.Td></Table.Td>;
  }
  const linkParams = {
    spaceId,
    subjectId,
    obsId,
  };
  return (
    <Table.Td width={60}>
      {hovered && sameSpace && (
        <Link to={EditActivityRoute.to} params={linkParams}>
          <IconPencil size={16} color="green" />
        </Link>
      )}
    </Table.Td>
  );
};
