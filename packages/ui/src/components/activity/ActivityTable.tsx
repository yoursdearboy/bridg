import { Box, LoadingOverlay, Table, Text } from "@mantine/core";
import type { UseQueryResult } from "@tanstack/react-query";
import type { PerformedObservation } from "api-ts";
import { useTranslation } from "react-i18next";

interface ActivityTableWrapperProps {
  query: UseQueryResult<PerformedObservation[], Error>;
}

export const ActivityTableWrapper = ({ query }: ActivityTableWrapperProps) => {
  const { isPending, isError, error, data: observations } = query;
  const { t } = useTranslation();

  return (
    <>
      <Box pos="relative" style={{ minHeight: 80 }}>
        <LoadingOverlay visible={isPending} />
        {isError && (
          <Text color="red">{t("errorMessage", { error: error.message })}</Text>
        )}
        {!isPending && !isError && (
          <ActivityTable observations={observations} />
        )}
      </Box>
    </>
  );
};

interface ActivityTableProps {
  observations: PerformedObservation[];
}

const ActivityTable = ({ observations }: ActivityTableProps) => {
  const { t } = useTranslation();

  return (
    <Box>
      <Table highlightOnHover>
        <Table.Tbody>
          {observations.length === 0 ? (
            <Table.Tr>
              <Table.Td px={0} style={{ textAlign: "center" }}>
                {t("nodata")}
              </Table.Td>
            </Table.Tr>
          ) : (
            observations.map((observation) => (
              <ActivityTableRowWrapper
                key={observation.id}
                observation={observation}
              />
            ))
          )}
        </Table.Tbody>
      </Table>
    </Box>
  );
};

interface ActivityTableRowWrapper {
  observation: PerformedObservation;
}

const ActivityTableRowWrapper = ({ observation }: ActivityTableRowWrapper) => {
  const { t } = useTranslation();

  return (
    <>
      <Table.Tr>
        <Table.Td>
          {observation.instantiatedDefinedActivity?.nameCode.displayName}
        </Table.Td>
        <Table.Td>
          {t("intlDateTime", { val: observation.statusDate })}
        </Table.Td>
      </Table.Tr>
    </>
  );
};
