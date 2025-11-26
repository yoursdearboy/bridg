import {
  Card,
  LoadingOverlay,
  Space,
  Text,
  Timeline,
  useMantineTheme,
} from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import type { PersonStudySubject } from "api-ts";
import { useTranslation } from "react-i18next";
import api from "@/api";
import { getStatusColor } from "@/model";
import { Route as SpacesSpaceIdSubjectsSubjectIdRoute } from "@/routes/spaces/$spaceId/subjects/$subjectId";

interface PersonTimelineCardProps {
  personId: string;
}

// FIXME: Fix it
export const PersonTimelineCard = ({ personId }: PersonTimelineCardProps) => {
  const { t } = useTranslation();
  const query = useQuery({
    queryKey: ["person", personId, "subjects"],
    queryFn: () =>
      api.persons.indexPersonsPersonIdSubjectGet({
        personId,
      }),
  });
  const { isPending, isError, error, data: subjects } = query;

  return (
    <>
      <LoadingOverlay visible={isPending} />
      {isError && (
        <Text color="red">{t("errorMessage", { error: error.message })}</Text>
      )}
      {!isPending && !isError && (
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <SubjectsTimelineWrapper subjects={subjects} personId={personId} />
        </Card>
      )}
    </>
  );
};

interface SubjectsTimelineWrapperProps {
  subjects: PersonStudySubject[];
  personId: string;
}

const SubjectsTimelineWrapper = ({
  subjects,
}: SubjectsTimelineWrapperProps) => {
  const { t } = useTranslation();
  const theme = useMantineTheme();

  return (
    <>
      {subjects.length === 0
        ? t("nodata")
        : subjects.map((subject) => (
            <>
              <Timeline bulletSize={36} active={subjects.length}>
                <Timeline.Item
                  title={
                    <Link
                      style={{
                        textDecoration: "none",
                        color: theme.colors[getStatusColor(subject.status)][6],
                      }}
                      to={SpacesSpaceIdSubjectsSubjectIdRoute.to}
                      params={{
                        spaceId:
                          subject
                            .assignedStudySiteProtocolVersionRelationship[0]
                            .executedStudyProtocolVersion.id,
                        subjectId: subject.id,
                      }}
                    >
                      {subject.assignedStudySiteProtocolVersionRelationship[0]
                        .executedStudyProtocolVersion.label +
                        " (" +
                        (subject.status
                          ? t(`Status.${subject.status}`)
                          : t("na")) +
                        ")"}
                    </Link>
                  }
                >
                  <Text c="dimmed" size="md">
                    {t("intlDateTime", { val: subject.statusDate })}
                  </Text>
                  <Space h="md" />
                </Timeline.Item>
              </Timeline>
              {/* <Box px={7}>
                <SubjectTimeline subject={subject} personId={personId} />
              </Box> */}
            </>
          ))}
    </>
  );
};

// interface SubjectTimelineProps {
//   subject: PersonStudySubject;
//   personId: string;
// }

// const SubjectTimeline = ({ subject, personId }: SubjectTimelineProps) => {
//   const { t } = useTranslation();
//   const query = useQuery({
//     queryKey: ["person", personId, "subjects", subject.id],
//     queryFn: () =>
//       api.subjects.indexSpacesSpaceIdSubjectsSubjectIdActivityGet({
//         spaceId: "ce946229-9746-46cd-8dd3-b27a2fbfd48a",
//         subjectId: subject.id,
//       }),
//   });
//   const { isPending, isError, error, data: activities } = query;

//   return (
//     <>
//       <LoadingOverlay visible={isPending} />
//       {isError && (
//         <Text color="red">{t("errorMessage", { error: error.message })}</Text>
//       )}
//       {!isPending && !isError && (
//         <>
//           {activities.length === 0 ? (
//             t("nodata")
//           ) : (
//             <SubjectActivityTimelineCard activities={activities} />
//           )}
//         </>
//       )}
//     </>
//   );
// };

// interface SubjectActivityTimelineCardProps {
//   activities: PerformedActivity[];
// }

// const SubjectActivityTimelineCard = ({
//   activities,
// }: SubjectActivityTimelineCardProps) => {
//   return (
//     <Timeline bulletSize={24} active={activities.length} color="yellow">
//       {activities.map((activity) => (
//         <TimelineBullet activity={activity} />
//       ))}
//     </Timeline>
//   );
// };

// interface TimelineBulletProps {
//   activity: PerformedActivity;
// }

// const TimelineBullet = ({ activity }: TimelineBulletProps) => {
//   const { t } = useTranslation();
//   return (
//     <Timeline.Item>
//       <Text size="md" ml={10}>
//         {activity.instantiatedDefinedActivity?.nameCode.displayName ||
//           "unnamed"}
//       </Text>
//       <Text c="dimmed" size="sm" ml={10} mb={20}>
//         {t("intlDateTime", { val: activity.statusDate })}
//       </Text>
//     </Timeline.Item>
//   );
// };
