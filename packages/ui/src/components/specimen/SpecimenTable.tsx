import { Group, LoadingOverlay, Table, Text, Tooltip } from "@mantine/core";
import { useHover } from "@mantine/hooks";
import { IconCancel, IconMessage, IconPencil } from "@tabler/icons-react";
import type { UseQueryResult } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import type { Specimen } from "api-ts";
import { useTranslation } from "react-i18next";
import { Route as EditActivityRoute } from "@/routes/spaces/$spaceId/subjects/$subjectId/activities/$aId.edit";

interface SpecimenTableWrapperProps {
  query: UseQueryResult<Specimen[], Error>;
  spaceId: string;
  subjectId: string;
}

export const SpecimenTableWrapper = ({
  query,
  spaceId,
  subjectId,
}: SpecimenTableWrapperProps) => {
  const { isPending, isError, error, data: specimen } = query;
  const { t } = useTranslation();

  return (
    <>
      <LoadingOverlay visible={isPending} />
      {isError && (
        <Text color="red">{t("errorMessage", { error: error.message })}</Text>
      )}
      {!isPending && !isError && (
        <SpecimenTable
          specimen={specimen}
          spaceId={spaceId}
          subjectId={subjectId}
        />
      )}
    </>
  );
};

interface SpecimenTableProps {
  specimen: Specimen[];
  spaceId: string;
  subjectId: string;
}

const SpecimenTable = ({
  specimen,
  spaceId,
  subjectId,
}: SpecimenTableProps) => {
  const { t } = useTranslation();

  return (
    <Table highlightOnHover fz="md">
      <Table.Thead>
        <Table.Tr>
          <Table.Th>{t("Material.code")}</Table.Th>
          <Table.Th>{t("PerformedSpecimenCollection.dateRange.low")}</Table.Th>
          <Table.Th>{t("PerformedActivity.containingEpoch")}</Table.Th>
          <Table.Th>{t("PerformedActivity.contextForStudySite")}</Table.Th>
          <Table.Th>{t("PerformedActivity.statusCode")}</Table.Th>
          <Table.Th>{t("PerformedActivity.statusDate")}</Table.Th>
          <Table.Th />
          <Table.Th />
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {specimen.length === 0 ? (
          <Table.Tr>
            <Table.Td colSpan={5} px={0} style={{ textAlign: "center" }}>
              {t("nodata")}
            </Table.Td>
          </Table.Tr>
        ) : (
          specimen.map((s) => (
            <SpecimenTableRow
              key={s.id}
              specimen={s}
              spaceId={spaceId}
              subjectId={subjectId}
            />
          ))
        )}
      </Table.Tbody>
    </Table>
  );
};

interface SpecimenTableRowProps {
  specimen: Specimen;
  spaceId: string;
  subjectId: string;
}

const SpecimenTableRow = ({
  specimen,
  spaceId,
  subjectId,
}: SpecimenTableRowProps) => {
  const { t } = useTranslation();
  const { hovered, ref } = useHover();

  const activity = specimen.producingPerformedSpecimenCollection;

  return (
    <Table.Tr ref={ref}>
      <Table.Td>
        {specimen.performingMaterial.code?.displayName ||
          t("Specimen.defaultLabel")}
      </Table.Td>
      <Table.Td>
        {t("intlDateTime", { val: activity?.dateRange?.low })}
      </Table.Td>
      <Table.Td>{activity?.containingEpoch?.name}</Table.Td>
      <Table.Td>{activity?.contextForStudySite?.label}</Table.Td>
      <Table.Td>{activity?.statusCode?.displayName}</Table.Td>
      <Table.Td>{t("intlDateTime", { val: activity?.statusDate })}</Table.Td>
      <Table.Td>
        <Group>
          {activity?.comment && (
            <Tooltip label={activity.comment}>
              <IconMessage size={18} />
            </Tooltip>
          )}
          {activity?.negationReason && (
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
        {hovered && activity && (
          <Link
            to={EditActivityRoute.to}
            params={{
              spaceId,
              subjectId,
              aId: activity.id,
            }}
            style={{ color: "inherit" }}
          >
            <IconPencil size={16} />
          </Link>
        )}
      </Table.Td>
    </Table.Tr>
  );
};
