import type { PerformedActivity } from "@bridg/api-ts";
import { Group, LoadingOverlay, Table, Text, Tooltip } from "@mantine/core";
import { useHover } from "@mantine/hooks";
import { IconCancel, IconMessage, IconPencil } from "@tabler/icons-react";
import type { UseQueryResult } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Route as EditActivityRoute } from "@/routes/spaces/$spaceId/subjects/$subjectId/activities/$aId.edit";

interface ActivityTableWrapperProps {
  query: UseQueryResult<PerformedActivity[], Error>;
  spaceId: string;
  subjectId: string;
}

export const ActivityTableWrapper = ({
  query,
  spaceId,
  subjectId,
}: ActivityTableWrapperProps) => {
  const { isPending, isError, error, data: activities } = query;
  const { t } = useTranslation();

  return (
    <>
      <LoadingOverlay visible={isPending} />
      {isError && (
        <Text color="red">{t("errorMessage", { error: error.message })}</Text>
      )}
      {!isPending && !isError && (
        <ActivityTable
          activities={activities}
          spaceId={spaceId}
          subjectId={subjectId}
        />
      )}
    </>
  );
};

interface ActivityTableProps {
  activities: PerformedActivity[];
  spaceId: string;
  subjectId: string;
}

const ActivityTable = ({
  activities,
  spaceId,
  subjectId,
}: ActivityTableProps) => {
  const { t } = useTranslation();

  return (
    <Table highlightOnHover fz="md">
      <Table.Thead>
        <Table.Tr>
          <Table.Th />
          <Table.Th>{t("PerformedActivity.containingEpoch")}</Table.Th>
          <Table.Th>{t("PerformedActivity.contextForStudySite")}</Table.Th>
          <Table.Th>{t("PerformedActivity.statusCode")}</Table.Th>
          <Table.Th>{t("PerformedActivity.statusDate")}</Table.Th>
          <Table.Th />
          <Table.Th />
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {activities.length === 0 ? (
          <Table.Tr>
            <Table.Td colSpan={5} px={0} style={{ textAlign: "center" }}>
              {t("nodata")}
            </Table.Td>
          </Table.Tr>
        ) : (
          activities.map((activity) => (
            <ActivityTableRow
              key={activity.id}
              activity={activity}
              spaceId={spaceId}
              subjectId={subjectId}
            />
          ))
        )}
      </Table.Tbody>
    </Table>
  );
};

interface ActivityTableRowProps {
  activity: PerformedActivity;
  spaceId: string;
  subjectId: string;
}

const ActivityTableRow = ({
  activity,
  spaceId,
  subjectId,
}: ActivityTableRowProps) => {
  const { t } = useTranslation();
  const { hovered, ref } = useHover();
  const linkParams = {
    spaceId,
    subjectId,
    aId: activity.id,
  };

  return (
    <Table.Tr ref={ref}>
      <Table.Td>
        {activity.instantiatedDefinedActivity?.nameCode.displayName ||
          t("Activity.defaultLabel")}
      </Table.Td>
      <Table.Td>{activity.containingEpoch?.name}</Table.Td>
      <Table.Td>{activity.contextForStudySite?.label}</Table.Td>
      <Table.Td>{activity.statusCode?.displayName}</Table.Td>
      <Table.Td>{t("intlDateTime", { val: activity.statusDate })}</Table.Td>
      <Table.Td>
        <Group>
          {activity.comment && (
            <Tooltip label={activity.comment}>
              <IconMessage size={18} />
            </Tooltip>
          )}
          {activity.negationReason && (
            <Tooltip
              label={
                <Text>
                  {activity.negationReason.displayName ||
                    activity.negationReason.code}
                </Text>
              }
            >
              <IconCancel size={18} color="red" />
            </Tooltip>
          )}
        </Group>
      </Table.Td>
      <Table.Td w={60}>
        {hovered && (
          <Link
            to={EditActivityRoute.to}
            params={linkParams}
            style={{ color: "inherit" }}
          >
            <IconPencil size={16} />
          </Link>
        )}
      </Table.Td>
    </Table.Tr>
  );
};
