import { LoadingOverlay, Stack, Text } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import type { DefinedObservationResult, StudyActivity } from "api-ts";
import { useTranslation } from "react-i18next";
import api from "@/api";
import { ObservationResult } from "./ObservationResult";

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
  const { t } = useTranslation();
  const query = useQuery({
    queryKey: ["subjects", subjectId, "activities", activity.id, "result"],
    queryFn: () =>
      api.spaceActivity.indexSpacesSpaceIdActivityObsIdResultGet({
        spaceId,
        obsId: activity.id,
      }),
  });
  const { isPending, isError, error, data: results } = query;

  return (
    <>
      <LoadingOverlay visible={isPending} />
      {isError && (
        <Text color="red">{t("errorMessage", { error: error.message })}</Text>
      )}
      {!isPending && !isError && (
        <ActivityForm
          spaceId={spaceId}
          subjectId={subjectId}
          results={results}
        />
      )}
    </>
  );
};

interface ActivityFormProps {
  spaceId: string;
  subjectId: string;
  results: DefinedObservationResult[];
}

const ActivityForm = ({ results }: ActivityFormProps) => {
  return (
    <Stack align="flex-start" gap="md">
      <Stack>
        {results.map((result) => (
          <ObservationResult result={result} />
        ))}
      </Stack>
    </Stack>
  );
};
