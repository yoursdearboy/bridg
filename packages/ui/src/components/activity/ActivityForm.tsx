import { Card, Stack, Text } from "@mantine/core";
import {
  instanceOfDefinedObservation,
  type DefinedActivityUnion,
  type DefinedObservation,
  type PerformedActivityUnion,
  type PerformedObservation,
} from "api-ts";
import { useTranslation } from "react-i18next";
import { matchObservationResult } from "@/util";
import { ObservatonResultForm } from "./ObservationResultForm";

interface ActivityFormProps {
  definedActivity: DefinedActivityUnion;
  performedActivity?: PerformedActivityUnion;
}

export const ActivityForm = ({
  definedActivity,
  performedActivity,
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
        />
      </Card.Section>
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
        <ObservatonResultForm
          definedObservationResult={definedObservationResult}
          performedObservationResult={performedObservationResult}
        />
      ))}
    </Stack>
  );
};
