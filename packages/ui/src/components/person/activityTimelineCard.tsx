import {
  Box,
  Card,
  LoadingOverlay,
  Space,
  Text,
  Timeline,
} from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import type { PerformedActivity, PersonStudySubject } from "api-ts";
import { useTranslation } from "react-i18next";
import api from "@/api";

interface PersonActivityTimelineCardProps {
  personId: string;
}

export const PersonActivityTimelineCard = ({
  personId,
}: PersonActivityTimelineCardProps) => {
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
  personId,
}: SubjectsTimelineWrapperProps) => {
  const { t } = useTranslation();

  return (
    <>
      {subjects.length === 0
        ? t("nodata")
        : subjects.map((subject) => (
            <>
              <Timeline bulletSize={36} active={subjects.length}>
                <Timeline.Item
                  title={
                    subject.status ? t(`Status.${subject.status}`) : t("na")
                  }
                >
                  <Text c="dimmed" size="md">
                    {t("intlDateTime", { val: subject.statusDate })}
                  </Text>
                  <Space h="md" />
                </Timeline.Item>
              </Timeline>
              <Box px={7}>
                <SubjectTimeline subject={subject} personId={personId} />
              </Box>
            </>
          ))}
    </>
  );
};

interface SubjectTimelineProps {
  subject: PersonStudySubject;
  personId: string;
}

const SubjectTimeline = ({ subject, personId }: SubjectTimelineProps) => {
  const { t } = useTranslation();
  const query = useQuery({
    queryKey: ["person", personId, "subjects", subject.id],
    queryFn: () =>
      api.subjects.indexSpacesSpaceIdSubjectsSubjectIdActivityGet({
        spaceId: "ce946229-9746-46cd-8dd3-b27a2fbfd48a",
        subjectId: subject.id,
      }),
  });
  const { isPending, isError, error, data: activities } = query;

  return (
    <>
      <LoadingOverlay visible={isPending} />
      {isError && (
        <Text color="red">{t("errorMessage", { error: error.message })}</Text>
      )}
      {!isPending && !isError && (
        <>
          {activities.length === 0 ? (
            t("nodata")
          ) : (
            <SubjectActivityTimelineCard activities={activities} />
          )}
        </>
      )}
    </>
  );
};

interface SubjectActivityTimelineCardProps {
  activities: PerformedActivity[];
}

const SubjectActivityTimelineCard = ({
  activities,
}: SubjectActivityTimelineCardProps) => {
  return (
    <Timeline bulletSize={24} active={activities.length} color="yellow">
      {activities.map((activity) => (
        <TimelineBullet activity={activity} />
      ))}
    </Timeline>
  );
};

interface TimelineBulletProps {
  activity: PerformedActivity;
}

const TimelineBullet = ({ activity }: TimelineBulletProps) => {
  const { t } = useTranslation();
  return (
    <Timeline.Item>
      <Text size="md" ml={10}>
        {activity.instantiatedDefinedActivity?.nameCode.displayName ||
          "unnamed"}
      </Text>
      <Text c="dimmed" size="sm" ml={10}>
        {t("intlDateTime", { val: activity.statusDate })}
      </Text>
    </Timeline.Item>
  );
};
