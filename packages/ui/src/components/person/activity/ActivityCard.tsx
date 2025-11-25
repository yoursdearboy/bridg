import { Card, Table } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import type {
  PersonStudySubject,
  StudySiteProtocolVersionRelationship,
} from "api-ts";
import { useTranslation } from "react-i18next";
import api from "@/api";

export function ActivityCard({ personId }: { personId: string }) {
  const query = useQuery({
    queryKey: ["person", personId, "subjects"],
    queryFn: () =>
      api.persons.indexPersonsPersonIdSubjectGet({
        personId,
      }),
  });
  const { isPending, isError, error, data: sites } = query;
  if (isError) return error.message;
  if (isPending) return "123";

  return (
    <>
      <Card withBorder shadow="sm" radius="md" padding="xs">
        <Card.Section withBorder inheritPadding py="xs">
          <Table highlightOnHover>
            <Table.Tbody>
              {sites.map((site: PersonStudySubject) => (
                <RelationRows
                  subjectId={site.id}
                  relations={site.assignedStudySiteProtocolVersionRelationship}
                />
              ))}
            </Table.Tbody>
          </Table>
        </Card.Section>
      </Card>
    </>
  );
}

const RelationRows = ({
  subjectId,
  relations,
}: {
  subjectId: string;
  relations: StudySiteProtocolVersionRelationship[];
}) => {
  return (
    <>
      {relations.map((relation) => (
        <TableRows
          spaceId={relation.executedStudyProtocolVersion.id}
          subjectId={subjectId}
        />
      ))}
    </>
  );
};

const TableRows = ({
  spaceId,
  subjectId,
}: {
  spaceId: string;
  subjectId: string;
}) => {
  const { t } = useTranslation();
  const query = useQuery({
    queryKey: ["spaces", spaceId, "subjects", subjectId],
    queryFn: () =>
      api.subjects.indexSpacesSpaceIdSubjectsSubjectIdActivityGet({
        spaceId,
        subjectId,
      }),
  });
  const { isPending, isError, error, data: activities } = query;
  if (isError) return error.message;
  if (isPending) return "123";

  return (
    <>
      {activities.map((activity) => (
        <Table.Tr>
          <Table.Td>
            {activity.instantiatedDefinedActivity?.nameCode.displayName ||
              t("Activity.defaultLabel")}
          </Table.Td>
          <Table.Td>{activity.containingEpoch?.name}</Table.Td>
          <Table.Td>{t("intlDateTime", { val: activity.statusDate })}</Table.Td>
          <Table.Td>{activity.statusCode?.displayName}</Table.Td>
        </Table.Tr>
      ))}
    </>
  );
};
