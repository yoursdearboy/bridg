import { Card, Group, Stack, Text, Textarea } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import {
  instanceOfDefinedObservation,
  type ConceptDescriptor,
  type DefinedActivityUnion,
  type DefinedObservation,
  type PerformedActivityUnionData,
  type PerformedObservationData,
  type PerformedObservationResultData,
} from "api-ts";
import { useTranslation } from "react-i18next";
import { EpochSelect } from "@/components/input/EpochSelect";
import { StudySiteSelect } from "@/components/input/StudySiteSelect";
import { doesMatchObservationResult, matchObservationResult } from "@/model";
import { ConceptDescriptorSelect } from "./Input";
import { ObservatonResultForm } from "./ObservationResultForm";

interface ActivityFormProps {
  spaceId: string;
  definedActivity: DefinedActivityUnion;
  performedActivity: PerformedActivityUnionData;
  onChange: (activity: PerformedActivityUnionData) => void;
}

const ActivityFields = ({
  spaceId,
  performedActivity,
  onChange,
}: ActivityFormProps) => {
  const { t } = useTranslation();
  // eslint-disable-next-line @stylistic/comma-dangle
  const handleChange = <T,>(data: { [key: string]: T }): void =>
    onChange({ ...performedActivity, ...data });
  return (
    <Stack>
      <EpochSelect
        label={t("PerformedActivity.containingEpoch")}
        value={performedActivity.containingEpochId}
        onChange={(containingEpochId) => handleChange({ containingEpochId })}
        spaceId={spaceId}
      />
      <StudySiteSelect
        label={t("PerformedActivity.contextForStudySite")}
        value={performedActivity.contextForStudySiteId}
        onChange={(contextForStudySiteId) =>
          handleChange({ contextForStudySiteId })
        }
        spaceId={spaceId}
      />
      <ConceptDescriptorSelect
        label={t("PerformedActivity.negationReason")}
        value={performedActivity.negationReason}
        codeSystem="performed_activity.negation_reason"
        onChange={(negationReason: ConceptDescriptor | null) =>
          handleChange({
            negationIndicator: negationReason !== null,
            negationReason,
          })
        }
      />
      <Textarea
        label={t("PerformedActivity.comment")}
        value={performedActivity.comment || ""}
        onChange={(e) => handleChange({ comment: e.target.value || null })}
      />
      <Group grow>
        <ConceptDescriptorSelect
          label={t("PerformedActivity.statusCode")}
          value={performedActivity.statusCode}
          onChange={(statusCode) => handleChange({ statusCode })}
          codeSystem="performed_activity.status_code"
        />
        <DateInput
          label={t("PerformedActivity.statusDate")}
          value={performedActivity.statusDate}
          onChange={(value) => {
            handleChange({ statusDate: value ? new Date(value) : null });
          }}
          valueFormat="L"
        />
      </Group>
    </Stack>
  );
};

export const ActivityForm = ({
  spaceId,
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
      <Card.Section withBorder inheritPadding py="xs">
        <ActivityFormSwitch
          definedActivity={definedActivity}
          performedActivity={performedActivity}
          onChange={onChange}
          spaceId={spaceId}
        />
      </Card.Section>
      <Card.Section withBorder inheritPadding py="xs">
        <ActivityFields
          spaceId={spaceId}
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
