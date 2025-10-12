import { Group, LoadingOverlay, Stack, Text } from "@mantine/core";
import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import type { DefinedObservationResult, StudyActivity } from "api-ts";
import { useTranslation } from "react-i18next";
import api from "@/api";
import { DefinedActivityResultWrapper } from "./definedActivityResult/definedActivityResultWrapper";

interface ActivityFormWrapperProps {
  activity: StudyActivity;
  spaceId: string;
  subjectId: string;
}

export const ActivityFormWrapper = ({
  activity,
  spaceId,
  subjectId,
}: ActivityFormWrapperProps) => {
  const query = useQuery({
    queryKey: ["subjects", subjectId, "activities", activity.id, "result"],
    queryFn: () =>
      api.spaceActivity.indexSpacesSpaceIdActivityObsIdResultGet({
        spaceId,
        obsId: activity.id,
      }),
  });

  return <ActivityForm spaceId={spaceId} subjectId={subjectId} query={query} />;
};

interface ActivityFormProps {
  spaceId: string;
  subjectId: string;
  query: UseQueryResult<DefinedObservationResult[], Error>;
}

const ActivityForm = ({ spaceId, subjectId, query }: ActivityFormProps) => {
  const { t } = useTranslation();
  const { isPending, isError, error, data: results } = query;

  return <Stack align="flex-start" gap="md">
    <LoadingOverlay visible={isPending} />
    {isError && (
      <Text color="red">
        {t("errorMessage", { error: error.message })}
      </Text>
    )}
    {!isPending && !isError && (
      <Stack>
        {results.map((result) => <DefinedActivityResultWrapper result={result} />)}
      </Stack>
    )}
  </Stack>;
};
