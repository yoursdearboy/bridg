import { Button, Card, LoadingOverlay, Table } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import type { PerformedActivity, PersonStudySubject } from "api-ts";
import { useState, type Dispatch, type SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import api from "@/api";

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
  const { isPending, isError, error, data: activities } = query;
  if (isError) return error.message;
  if (isPending) return <LoadingOverlay />;

  return (
    <>
      <Card withBorder shadow="sm" radius="md" padding="xs">
        {spaceId ? (
          <Button onClick={() => toggleShowAll(!showAll)}></Button>
        ) : null}

        <Card.Section withBorder inheritPadding py="xs">
          <Table highlightOnHover>
            <Table.Tbody>
              {activities.map(
                ({
                  subject,
                  activities,
                }: {
                  subject: PersonStudySubject;
                  activities: PerformedActivity[];
                }) => (
                  <SubjectActivities
                    subject={subject}
                    activities={activities}
                    showAll={showAll}
                    spaceId={spaceId}
                  />
                )
              )}
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
  const { t } = useTranslation();
  const sameSpace =
    spaceId &&
    spaceId ===
      subject.assignedStudySiteProtocolVersionRelationship[0]
        .executedStudyProtocolVersion.id;
  return (
    <>
      {activities.map((activity) => (
        <Table.Tr
          bg={
            showAll && sameSpace ? "var(--mantine-color-blue-light)" : undefined
          }
        >
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
