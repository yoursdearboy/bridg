import { Stack } from "@mantine/core";
import type { PerformedObservationResult } from "api-ts";
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
