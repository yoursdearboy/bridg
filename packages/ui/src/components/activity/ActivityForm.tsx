import { Button, LoadingOverlay, Stack, Text } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import type {
  DefinedObservationResult,
  PerformedObservationResult,
} from "api-ts";
import { useTranslation } from "react-i18next";
import api from "@/api";
import { ObservationResult } from "./ObservationResult";

interface ActivityFormWrapperProps {
  spaceId: string;
  subjectId: string;
  results: PerformedObservationResult[];
  definedActivityId: string;
}

export const ActivityFormWrapper = ({
  spaceId,
  subjectId,
  results,
  definedActivityId,
}: ActivityFormWrapperProps) => {
  const {
    data: definedResults,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["subject", subjectId, "activity", definedActivityId],
    queryFn:async  () =>
      await api.spaceActivity.indexSpacesSpaceIdActivityObsIdResultGet({
        spaceId: spaceId,
        obsId: definedActivityId,
      }),
  });
  const { t } = useTranslation();

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
          definedResults={definedResults}
        />
      )}
    </>
  );
};

interface ActivityFormProps {
  spaceId: string;
  subjectId: string;
  results: PerformedObservationResult[];
  definedResults: DefinedObservationResult[];
}

const ActivityForm = ({ results, definedResults }: ActivityFormProps) => {
  const { t } = useTranslation();
  console.log(definedResults)
  return (
    <Stack align="flex-start" w="100%">
      <Stack w="100%">
        {results.map((result) => (
          <ObservationResult result={result} />
        ))}
      </Stack>
      <Button type="submit">{t("submit")}</Button>
    </Stack>
  );
};
