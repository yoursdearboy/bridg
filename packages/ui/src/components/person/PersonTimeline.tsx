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
  const { isPending, isError, error, data: sites } = query;

  return (
    <>
      <LoadingOverlay visible={isPending} />
      {isError && (
        <Text color="red">{t("errorMessage", { error: error.message })}</Text>
      )}
      {!isPending && !isError && (
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <SubjectsTimelineWrapper sites={sites} personId={personId} />
        </Card>
      )}
    </>
  );
};

interface SubjectsTimelineWrapperProps {
  sites: PersonStudySubject[];
  personId: string;
}

const SubjectsTimelineWrapper = ({
  sites,
  personId,
}: SubjectsTimelineWrapperProps) => {
  const { t } = useTranslation();

  return (
    <>
      {sites.length === 0
        ? t("nodata")
        : sites.map((site) => (
            <>
              <Timeline bulletSize={36} active={sites.length}>
                <Timeline.Item
                  title={
                    site.assignedStudySiteProtocolVersionRelationship[0]
                      .executedStudyProtocolVersion.label +
                    " (" +
                    (site.status ? t(`Status.${site.status}`) : t("na")) +
                    ")"
                  }
                >
                  <Text c="dimmed" size="md">
                    {t("intlDateTime", { val: site.statusDate })}
                  </Text>
                  <Space h="md" />
                </Timeline.Item>
              </Timeline>
              <Box px={7}>
                <SubjectTimeline
                  site={site}
                  personId={personId}
                  spaceId={
                    site.assignedStudySiteProtocolVersionRelationship[0]
                      .executedStudyProtocolVersion.id
                  }
                />
              </Box>
            </>
          ))}
    </>
  );
};

interface SubjectTimelineProps {
  site: PersonStudySubject;
  personId: string;
  spaceId: string;
}

const SubjectTimeline = ({ site, personId, spaceId }: SubjectTimelineProps) => {
  const { t } = useTranslation();
  const query = useQuery({
    queryKey: ["person", personId, "subjects", site.id],
    queryFn: () =>
      api.subjects.indexSpacesSpaceIdSubjectsSubjectIdActivityGet({
        spaceId: spaceId,
        subjectId: site.id,
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
      <Text c="dimmed" size="sm" ml={10} mb={20}>
        {t("intlDateTime", { val: activity.statusDate })}
      </Text>
    </Timeline.Item>
  );
};
