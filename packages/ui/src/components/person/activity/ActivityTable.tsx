import { Table } from "@mantine/core";
import { useHover } from "@mantine/hooks";
import { IconPencil } from "@tabler/icons-react";
import { Link } from "@tanstack/react-router";
import type { PerformedActivity, PersonStudySubject } from "api-ts";
import { useTranslation } from "react-i18next";
import { Route as EditActivityRoute } from "@/routes/spaces/$spaceId/subjects/$subjectId/activities/$obsId.edit";

interface ActivitiesTableProps {
  subjectWActivities: {
    subject: PersonStudySubject;
    activities: PerformedActivity[];
  }[];
  showAll: boolean;
  spaceId?: string;
}

export function ActivitiesTable({
  subjectWActivities,
  showAll,
  spaceId,
}: ActivitiesTableProps) {
  const { t } = useTranslation();
  return (
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
          <SubjectActivitiesRows
            subject={subject}
            activities={activities}
            showAll={showAll}
            spaceId={spaceId}
          />
        ))}
      </Table.Tbody>
    </Table>
  );
}

const SubjectActivitiesRows = ({
  subject,
  activities,
  showAll,
  spaceId,
}: {
  subject: PersonStudySubject;
  activities: PerformedActivity[];
  showAll: boolean;
  spaceId?: string;
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
  spaceId?: string;
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
  spaceId?: string;
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
