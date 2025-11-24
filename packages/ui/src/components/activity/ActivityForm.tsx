import { Card, Stack } from "@mantine/core";
import {
  instanceOfDefinedObservation,
  type DefinedActivityUnion,
  type DefinedObservation,
  type PerformedActivityUnion,
  type PerformedObservation,
} from "api-ts";
import { matchObservationResult } from "@/util";
import { Input } from "./ObservationResult";

interface ActivityFormProps {
  definedActivity: DefinedActivityUnion;
  performedActivity?: PerformedActivityUnion;
}

export const ActivityForm = ({
  definedActivity,
  performedActivity,
}: ActivityFormProps) => {
  return (
    <Card withBorder shadow="sm" radius="md">
      <ActivityFormSwitch
        definedActivity={definedActivity}
        performedActivity={performedActivity}
      />
    </Card>
  );
};

const ActivityFormSwitch = ({
  definedActivity,
  performedActivity,
}: ActivityFormProps) => {
  if (instanceOfDefinedObservation(definedActivity)) {
    return (
      <ObservationForm
        definedActivity={definedActivity}
        performedActivity={performedActivity as PerformedObservation}
      />
    );
  }
};

interface ObservationFormProps {
  definedActivity: DefinedObservation;
  performedActivity?: PerformedObservation;
}

const ObservationForm = ({
  definedActivity,
  performedActivity,
}: ObservationFormProps) => {
  return (
    <Stack>
      {matchObservationResult(
        definedActivity.producedDefinedObservationResult,
        performedActivity?.resultedPerformedObservationResult || []
      ).map(({ definedObservationResult, performedObservationResult }) => (
        <Input
          definedObservationResult={definedObservationResult}
          performedObservationResult={performedObservationResult}
        />
      ))}
    </Stack>
  );
};
