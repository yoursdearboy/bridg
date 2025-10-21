import { Button, Stack } from "@mantine/core";
import type { PerformedObservationResult } from "api-ts";
import { useTranslation } from "react-i18next";
import { ObservationResult } from "./ObservationResult";

interface ActivityFormWrapperProps {
  spaceId: string;
  subjectId: string;
  results: PerformedObservationResult[];
}

export const ActivityFormWrapper = ({
  spaceId,
  subjectId,
  results,
}: ActivityFormWrapperProps) => {
  return (
    <ActivityForm spaceId={spaceId} subjectId={subjectId} results={results} />
  );
};

interface ActivityFormProps {
  spaceId: string;
  subjectId: string;
  results: PerformedObservationResult[];
}

const ActivityForm = ({ results }: ActivityFormProps) => {
  const { t } = useTranslation();
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
