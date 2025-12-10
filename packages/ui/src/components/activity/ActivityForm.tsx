import { Card, Stack, Text } from "@mantine/core";
import {
  instanceOfDefinedObservation,
  type DefinedActivityUnion,
  type DefinedObservation,
  type PerformedActivityUnionData,
  type PerformedObservationData,
  type PerformedObservationResultData,
} from "api-ts";
import { useTranslation } from "react-i18next";
import { doesMatchObservationResult, matchObservationResult } from "@/model";
import { ObservatonResultForm } from "./ObservationResultForm";

interface ActivityFormProps {
  definedActivity: DefinedActivityUnion;
  performedActivity: PerformedActivityUnionData;
  onChange: (activity: PerformedActivityUnionData) => void;
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
        performedActivity={performedActivity as PerformedObservationData}
        onChange={onChange}
      />
    );
  }
};

interface ObservationFormProps {
  definedActivity: DefinedObservation;
  performedActivity: PerformedObservationData;
  onChange: (obs: PerformedObservationData) => void;
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
  const updateResults = (newResult: PerformedObservationResultData) =>
    results.map(({ definedObservationResult, performedObservationResult }) =>
      doesMatchObservationResult(definedObservationResult, newResult)
        ? newResult
        : performedObservationResult
    );
  return (
    <Stack>
      {results.map(
        ({ definedObservationResult, performedObservationResult }) => (
          <ObservatonResultForm
            key={definedObservationResult.id}
            definedObservationResult={definedObservationResult}
            performedObservationResult={performedObservationResult}
            onChange={(newResult: PerformedObservationResultData) =>
              onChange({
                ...performedActivity,
                resultedPerformedObservationResult: updateResults(newResult),
              })
            }
          />
        )
      )}
    </Stack>
  );
};
