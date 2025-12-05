import { Card, LoadingOverlay, Table } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import type {
  PerformedActivity
} from "api-ts";
import { useTranslation } from "react-i18next";
import api from "@/api";

export function ActivityCard({
  personId
}: {
  personId: string;
}) {
  const { t } = useTranslation();
  const query = useQuery({
    queryKey: ["person", personId, "subjects", "activities"],
    queryFn: async () => {
     
      const subjects = await api.persons.indexPersonsPersonIdSubjectGet({
        personId,
      });
      const activitiesPromises = subjects.map((subject) =>
        api.subjects.indexSpacesSpaceIdSubjectsSubjectIdActivityGet({
          spaceId:
            subject.assignedStudySiteProtocolVersionRelationship[0]
              .executingStudySite.id,
          subjectId: subject.id,
        })
      );
      const activitiesArrays = await Promise.all(activitiesPromises);
      const activities = activitiesArrays.flat();

      return activities;
    },
  });
  const { isPending, isError, error, data: activities } = query;
  if (isError) return error.message;
  if (isPending) return <LoadingOverlay />;

  return (
    <>
      <Card withBorder shadow="sm" radius="md" padding="xs">
        <Card.Section withBorder inheritPadding py="xs">
          <Table highlightOnHover>
            <Table.Tbody>
              {activities.map((activity: PerformedActivity) => (
                <Table.Tr color={currentSubject ? "blue" : undefined}>
                  <Table.Td>
                    {activity.instantiatedDefinedActivity?.nameCode
                      .displayName || t("Activity.defaultLabel")}
                  </Table.Td>
                  <Table.Td>{activity.containingEpoch?.name}</Table.Td>
                  <Table.Td>
                    {t("intlDateTime", { val: activity.statusDate })}
                  </Table.Td>
                  <Table.Td>{activity.statusCode?.displayName}</Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </Card.Section>
      </Card>
    </>
  );
}
