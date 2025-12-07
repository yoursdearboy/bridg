import { Card, Stack, Text } from "@mantine/core";
import {
  instanceOfDefinedObservation,
  type DefinedActivityUnion,
  type DefinedObservation,
  type PerformedActivityUnion,
  type PerformedObservation,
  type PerformedObservationResult,
} from "api-ts";
import { useTranslation } from "react-i18next";
import { matchObservationResult } from "@/util";
import { ObservatonResultForm } from "./ObservationResultForm";

interface ActivityFormProps {
  definedActivity: DefinedActivityUnion;
  performedActivity: PerformedActivityUnion;
  onChange: (activity: PerformedActivityUnion) => void;
}

export const ActivityForm = ({
  definedActivity,
  performedActivity,
  onChange,
}: ActivityFormProps) => {
  const { t } = useTranslation();
  return (
    <Card withBorder shadow="sm" radius="md">
      <Card.Section withBorder inheritPadding py="xs">
        <Text fw={500}>
          {definedActivity.nameCode.displayName || t("Activity.defaultLabel")}
        </Text>
      </Card.Section>
      <Card.Section inheritPadding py="xs">
        <ActivityFormSwitch
          definedActivity={definedActivity}
          performedActivity={performedActivity}
          onChange={onChange}
        />
      </Card.Section>
    </Card>
  );
};

const ActivityFormSwitch = ({
  definedActivity,
  performedActivity,
  onChange,
}: ActivityFormProps) => {
  if (instanceOfDefinedObservation(definedActivity)) {
    return (
      <ObservationForm
        definedActivity={definedActivity}
        performedActivity={performedActivity as PerformedObservation}
        onChange={onChange}
      />
    );
  }
};

interface ObservationFormProps {
  definedActivity: DefinedObservation;
  performedActivity: PerformedObservation;
  onChange: (obs: PerformedObservation) => void;
}

const ObservationForm = ({
  definedActivity,
  performedActivity,
  onChange,
}: ObservationFormProps) => {
  const results = matchObservationResult(
    definedActivity.producedDefinedObservationResult,
    performedActivity.resultedPerformedObservationResult
  );
  const updateResults = (result: PerformedObservationResult) =>
    results.map((r) =>
      r.performedObservationResult.id == result.id
        ? result
        : r.performedObservationResult
    );
  return (
    <Stack>
      {results.map(
        ({ definedObservationResult, performedObservationResult }) => (
          <ObservatonResultForm
            key={definedObservationResult.id}
            definedObservationResult={definedObservationResult}
            performedObservationResult={performedObservationResult}
            onChange={(result: PerformedObservationResult) =>
              onChange({
                ...performedActivity,
                resultedPerformedObservationResult: updateResults(result),
              })
            }
          />
        )
      )}
    </Stack>
  );
};
