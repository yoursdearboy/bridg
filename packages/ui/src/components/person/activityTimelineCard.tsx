import { Card, LoadingOverlay, Space, Text, Timeline } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import type { PerformedObservation, StudySubject } from "api-ts";
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
      api.persons.indexPersonsPersonIdSubjectsGet({
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
        <SubjectsTimelineWrapper subjects={subjects} personId={personId} />
      )}
    </>
  );
};

interface SubjectsTimelineWrapperProps {
  subjects: StudySubject[];
  personId: string;
}

const SubjectsTimelineWrapper = ({
  subjects,
  personId,
}: SubjectsTimelineWrapperProps) => {
  const { t } = useTranslation();

  return (
    <>
      {subjects.length === 0 ? (
        t("nodata")
      ) : (
        <Timeline bulletSize={36} color="indigo" active={subjects.length}>
          {subjects.map((subject) => (
            <Timeline.Item
              title={subject.status ? t(`Status.${subject.status}`) : t("na")}
            >
              <Text c="dimmed" size="md">
                {t("intlDateTime", { val: subject.statusDate })}
              </Text>
              <Space h="md" />
              <Card withBorder shadow="sm" radius="md" padding="xs">
                <SubjectTimeline subject={subject} personId={personId} />
              </Card>
            </Timeline.Item>
          ))}
        </Timeline>
      )}
    </>
  );
};

interface SubjectTimelineProps {
  subject: StudySubject;
  personId: string;
}

const SubjectTimeline = ({ subject, personId }: SubjectTimelineProps) => {
  const { t } = useTranslation();
  const query = useQuery({
    queryKey: ["person", personId, "subjects", subject.id],
    queryFn: () =>
      api.subjects.indexSpacesSpaceIdSubjectsSubjectIdObservationGet({
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
  activities: PerformedObservation[];
}

const SubjectActivityTimelineCard = ({
  activities,
}: SubjectActivityTimelineCardProps) => {
  return (
    <Timeline bulletSize={24}>
      {activities.map((activity) => (
        <TimelineBullet activity={activity} />
      ))}
    </Timeline>
  );
};

interface TimelineBulletProps {
  activity: PerformedObservation;
}

const TimelineBullet = ({ activity }: TimelineBulletProps) => {
  const { t } = useTranslation();
  return (
    <Timeline.Item
      title={
        activity.instantiatedDefinedActivity?.nameCode.displayName || "unnamed"
      }
    >
      <Text c="dimmed" size="sm">
        {t("intlDateTime", { val: activity.statusDate })}
      </Text>
    </Timeline.Item>
  );
};
