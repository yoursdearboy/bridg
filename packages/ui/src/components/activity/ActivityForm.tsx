import {
  instanceOfPerformedObservationData,
  instanceOfPerformedSpecimenCollectionData,
  type ConceptDescriptor,
  type DefinedActivityUnion,
  type DefinedObservation,
  type IntervalPointInTime,
  type PerformedActivityUnionData,
  type PerformedObservationData,
  type PerformedObservationResultData,
  type PerformedSpecimenCollectionData,
  type PerformingMaterialData,
  type ProducedSpecimenData,
} from "@bridg/api-ts";
import { Card, Group, Stack, Text, Textarea } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useTranslation } from "react-i18next";
import { EpochSelect } from "@/components/input/EpochSelect";
import { StudySiteSelect } from "@/components/input/StudySiteSelect";
import {
  doesMatchObservationResult,
  getClassNameOfPerformedActivityUnionData,
  matchObservationResult,
} from "@/model";
import { ConceptDescriptorSelect, IntervalPointInTimeInput } from "./Input";
import { ObservatonResultForm } from "./ObservationResultForm";

interface ActivityFormProps {
  spaceId: string;
  definedActivity: DefinedActivityUnion | null;
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
  const className = getClassNameOfPerformedActivityUnionData(performedActivity);
  return (
    <Stack>
      <IntervalPointInTimeInput
        label={t(`${className}.dateRange`)}
        value={performedActivity.dateRange}
        onChange={(dateRange: IntervalPointInTime | null) =>
          handleChange({
            dateRange,
          })
        }
      />
      <EpochSelect
        label={t(`${className}.containingEpoch`)}
        value={performedActivity.containingEpochId}
        onChange={(containingEpochId) => handleChange({ containingEpochId })}
        spaceId={spaceId}
      />
      <StudySiteSelect
        label={t(`${className}.contextForStudySite`)}
        value={performedActivity.contextForStudySiteId}
        onChange={(contextForStudySiteId) =>
          handleChange({ contextForStudySiteId })
        }
        spaceId={spaceId}
      />
      <ConceptDescriptorSelect
        label={t(`${className}.negationReason`)}
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
        label={t(`${className}.comment`)}
        value={performedActivity.comment || ""}
        onChange={(e) => handleChange({ comment: e.target.value || null })}
      />
      <Group grow>
        <ConceptDescriptorSelect
          label={t(`${className}.statusCode`)}
          value={performedActivity.statusCode}
          onChange={(statusCode) => handleChange({ statusCode })}
          codeSystem="performed_activity.status_code"
        />
        <DateInput
          label={t(`${className}.statusDate`)}
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
  return (
    <Card withBorder shadow="sm" radius="md">
      <Card.Section withBorder inheritPadding py="xs">
        <Text fw={500}>
          <ActivityFormTitle
            definedActivity={definedActivity}
            performedActivity={performedActivity}
            onChange={onChange}
            spaceId={spaceId}
          />
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

const ActivityFormTitle = ({
  definedActivity,
  performedActivity,
}: ActivityFormProps) => {
  const { t } = useTranslation();
  if (instanceOfPerformedObservationData(performedActivity)) {
    return definedActivity?.nameCode.displayName || t("Activity.defaultLabel");
  }
  if (instanceOfPerformedSpecimenCollectionData(performedActivity)) {
    return t("PerformedSpecimenCollection.defaultLabel");
  }
  return t("Activity.defaultLabel");
};

const ActivityFormSwitch = ({
  definedActivity,
  performedActivity,
  onChange,
}: ActivityFormProps) => {
  if (instanceOfPerformedObservationData(performedActivity)) {
    return (
      <ObservationForm
        definedActivity={definedActivity as DefinedObservation}
        performedActivity={performedActivity}
        onChange={onChange}
      />
    );
  }
  if (instanceOfPerformedSpecimenCollectionData(performedActivity))
    return (
      <SpecimenCollectionForm
        performedActivity={performedActivity}
        onChange={onChange}
      />
    );
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

interface SpecimenCollectionFormProps {
  performedActivity: PerformedSpecimenCollectionData;
  onChange: (data: PerformedSpecimenCollectionData) => void;
}

const SpecimenCollectionForm = ({
  performedActivity,
  onChange,
}: SpecimenCollectionFormProps) => {
  return performedActivity.producedSpecimen.map((producedSpecimen, i) => (
    <ProducedSpecimenForm
      key={i}
      producedSpecimen={producedSpecimen}
      onChange={(data) =>
        onChange({
          ...performedActivity,
          producedSpecimen: performedActivity.producedSpecimen.map((s) =>
            s.id && data.id && s.id == data.id ? data : s
          ),
        })
      }
    />
  ));
};

interface ProducedSpecimenFormProps {
  producedSpecimen: ProducedSpecimenData;
  onChange: (data: ProducedSpecimenData) => void;
}

const ProducedSpecimenForm = ({
  producedSpecimen,
  onChange,
}: ProducedSpecimenFormProps) => {
  return (
    <PerformingMaterialForm
      data={producedSpecimen.performingMaterial}
      onChange={(performingMaterial) =>
        onChange({
          ...producedSpecimen,
          performingMaterial,
        })
      }
    />
  );
};

interface PerformingMaterialFormProps {
  data: PerformingMaterialData;
  onChange: (data: PerformingMaterialData) => void;
}

const PerformingMaterialForm = ({
  data,
  onChange,
}: PerformingMaterialFormProps) => {
  const { t } = useTranslation();
  return (
    <Stack>
      <ConceptDescriptorSelect
        label={t("Material.code")}
        value={data.code}
        codeSystem="material.code"
        onChange={(code) => onChange({ ...data, code })}
      />
    </Stack>
  );
};
