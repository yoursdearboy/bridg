import { LoadingOverlay, Table, Text } from "@mantine/core";
import { useHover } from "@mantine/hooks";
import { IconPencil } from "@tabler/icons-react";
import type { UseQueryResult } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import type { PerformedObservation } from "api-ts";
import { useTranslation } from "react-i18next";
import { Route as EditActivityRoute } from "@/routes/spaces/$spaceId/subjects/$subjectId/activities/$obsId.edit";

interface ActivityTableWrapperProps {
  query: UseQueryResult<PerformedObservation[], Error>;
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
  activities: PerformedObservation[];
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
    <Table highlightOnHover>
      <Table.Tbody>
        {activities.length === 0 ? (
          <Table.Tr>
            <Table.Td px={0} style={{ textAlign: "center" }}>
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
  activity: PerformedObservation;
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
  const params = {
    spaceId,
    subjectId,
    obsId: activity.id,
  };

  return (
    <Table.Tr ref={ref}>
      <Table.Td>
        {activity.instantiatedDefinedActivity?.nameCode.displayName}
      </Table.Td>
      <Table.Td>{t("intlDateTime", { val: activity.statusDate })}</Table.Td>
      <Table.Td width={60}>
        {hovered && (
          <Link to={EditActivityRoute.to} params={params}>
            <IconPencil size={16} color="green" />
          </Link>
        )}
      </Table.Td>
    </Table.Tr>
  );
};
