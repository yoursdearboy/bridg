import { LoadingOverlay, Table, Text } from "@mantine/core";
import type { UseQueryResult } from "@tanstack/react-query";
import type { PerformedObservation } from "api-ts";
import { useTranslation } from "react-i18next";

interface ActivityTableWrapperProps {
  query: UseQueryResult<PerformedObservation[], Error>;
}

export const ActivityTableWrapper = ({ query }: ActivityTableWrapperProps) => {
  const { isPending, isError, error, data: activities } = query;
  const { t } = useTranslation();

  return (
    <>
      <LoadingOverlay visible={isPending} />
      {isError && (
        <Text color="red">{t("errorMessage", { error: error.message })}</Text>
      )}
      {!isPending && !isError && <ActivityTable activities={activities} />}
    </>
  );
};

interface ActivityTableProps {
  activities: PerformedObservation[];
}

const ActivityTable = ({ activities }: ActivityTableProps) => {
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
            <ActivityTableRow key={activity.id} activity={activity} />
          ))
        )}
      </Table.Tbody>
    </Table>
  );
};

interface ActivityTableRowProps {
  activity: PerformedObservation;
}

const ActivityTableRow = ({ activity }: ActivityTableRowProps) => {
  const { t } = useTranslation();

  return (
    <Table.Tr>
      <Table.Td>
        {activity.instantiatedDefinedActivity?.nameCode.displayName}
      </Table.Td>
      <Table.Td>{t("intlDateTime", { val: activity.statusDate })}</Table.Td>
    </Table.Tr>
  );
};
