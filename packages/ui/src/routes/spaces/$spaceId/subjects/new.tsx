import {
  Alert,
  Button,
  Card,
  CloseButton,
  Combobox,
  Flex,
  Grid,
  Group,
  MultiSelect,
  Select,
  Stack,
  Text,
  TextInput,
  useCombobox,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { hasLength, useForm, type UseFormReturnType } from "@mantine/form";
import { useDebouncedCallback } from "@mantine/hooks";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  type NewStudySubject,
  type FoundStudySubject,
  AdministrativeGender,
  Status,
} from "api-ts";
import { useTranslation } from "react-i18next";
import api from "@/api";
import i18next from "@/i18n";
import { STATUSES } from "@/model";
import { Route as SubjectIdRoute } from "./$subjectId";

export const Route = createFileRoute("/spaces/$spaceId/subjects/new")({
  loader: async ({ params }) => ({
    sites: await api.spaces.indexSiteSpaceSpaceIdSiteGet(params),
  }),
  beforeLoad: () => ({
    breadcrumb: i18next.t("SubjectNewPage.breadcrumb"),
  }),
  component: RouteComponent,
});

type NewStudySubjectFormProps = {
  form: UseFormReturnType<NewStudySubject>;
};

const PerformingBiologicEntityFields = ({ form }: NewStudySubjectFormProps) => {
  const { t } = useTranslation();
  const genders = Object.values(AdministrativeGender).map((value) => ({
    label: t(`Gender.${value}`),
    value,
  }));

  return (
    <>
      <Card withBorder>
        <Flex gap="md">
          <TextInput
            label={t("Name.family")}
            {...form.getInputProps(
              "performingBiologicEntity.primaryName.family"
            )}
          />
          <TextInput
            label={t("Name.given")}
            {...form.getInputProps(
              "performingBiologicEntity.primaryName.given"
            )}
          />
          <TextInput
            label={t("Name.patronymic")}
            {...form.getInputProps(
              "performingBiologicEntity.primaryName.patronymic"
            )}
          />
        </Flex>
      </Card>

      <Card withBorder>
        <Stack align="flex-start" gap="md">
          <Select
            label={t("Person.administrativeGenderCode")}
            data={genders}
            {...form.getInputProps(
              "performingBiologicEntity.administrativeGenderCode"
            )}
          />
          <DateInput
            label={t("Person.birthDate")}
            valueFormat="L"
            {...form.getInputProps("performingBiologicEntity.birthDate")}
          />
        </Stack>
      </Card>
    </>
  );
};

const PerformingBiologicEntitySelect = ({
  data,
  value,
  onChange,
}: {
  data: FoundStudySubject[];
  value?: string;
  onChange: (value: string | null) => void;
}) => {
  const store = useCombobox({
    opened: true,
  });

  const { t } = useTranslation();

  return (
    <Card withBorder>
      <Text fw={500} mb="sm">
        {t("PerformingBiologicEntitySelect.text")}
      </Text>
      <Combobox
        store={store}
        onOptionSubmit={(selectedValue) => {
          const newValue = selectedValue === value ? null : selectedValue;
          onChange(newValue);
        }}
      >
        <Combobox.Options>
          {data.map((subject) => (
            <Combobox.Option
              key={subject.performingBiologicEntity!.id}
              value={subject.performingBiologicEntity!.id}
              bg={
                subject.performingBiologicEntity!.id === value
                  ? "var(--mantine-primary-color-light)"
                  : ""
              }
            >
              {subject.performingBiologicEntity!.primaryName?.label ||
                t("Name.defaultLabel")}
            </Combobox.Option>
          ))}
        </Combobox.Options>
      </Combobox>
    </Card>
  );
};

const PerformingBiologicEntityCard = ({
  subject,
  form,
}: {
  subject: FoundStudySubject;
} & NewStudySubjectFormProps) => {
  const { t } = useTranslation();

  return (
    <Card withBorder>
      <Group gap="xs">
        <Text fw={500}>
          {subject.performingBiologicEntity?.primaryName?.label ||
            t("Name.defaultLabel")}
        </Text>
        <CloseButton
          onClick={() => form.resetField("performingBiologicEntityId")}
        />
      </Group>
    </Card>
  );
};

const StudySubjectFields = ({ form }: NewStudySubjectFormProps) => {
  const { t } = useTranslation();
  const { sites } = Route.useLoaderData();
  const statuses = STATUSES.map((value) => ({
    label: t(`Status.${value}`),
    value,
  }));

  return (
    <>
      <Card withBorder>
        <Stack align="flex-start" gap="md">
          <Select
            label={t("StudySubject.status")}
            data={statuses}
            {...form.getInputProps("status")}
          />
          <DateInput
            label={t("StudySubject.statusDate")}
            valueFormat="L"
            {...form.getInputProps("statusDate")}
          />
          <MultiSelect
            label={t(
              "StudySubject.assignedStudySiteProtocolVersionRelationship"
            )}
            data={sites.map((s) => ({
              value: s.id,
              label: s.executingStudySite.label || t("StudySite.defaultLabel"),
            }))}
            {...form.getInputProps(
              "assignedStudySiteProtocolVersionRelationship"
            )}
          />
        </Stack>
      </Card>
    </>
  );
};

function RouteComponent() {
  const { spaceId } = Route.useParams();

  const navigate = useNavigate();

  const { t } = useTranslation();

  const lookup = useQuery({
    queryKey: [],
    queryFn: () =>
      api.subjects.lookupSpaceSpaceIdSubjectLookupPost({
        spaceId,
        lookupStudySubject: form.getValues(),
      }),
  });
  const doLookup = useDebouncedCallback(lookup.refetch, 1000);

  const form = useForm<NewStudySubject>({
    initialValues: {
      performingBiologicEntity: {
        administrativeGenderCode: null,
        birthDate: null,
        identifier: [],
        primaryName: {
          family: "",
          given: "",
          patronymic: "",
        },
        deathDate: null,
        deathDateEstimatedIndicator: null,
        deathIndicator: null,
      },
      performingBiologicEntityId: null,
      status: Status.Candidate,
      statusDate: new Date(),
      assignedStudySiteProtocolVersionRelationship: [],
    },
    onValuesChange: () => doLookup(),
    transformValues: (values: NewStudySubject) => ({
      ...values,
      performingBiologicEntity: values.performingBiologicEntity && {
        ...values.performingBiologicEntity,
        birthDate:
          values.performingBiologicEntity.birthDate &&
          new Date(values.performingBiologicEntity.birthDate),
      },
      statusDate: values.statusDate && new Date(values.statusDate),
    }),
    validate: {
      assignedStudySiteProtocolVersionRelationship: hasLength({ min: 1 }),
    },
  });

  const selectedLookup =
    form.values.performingBiologicEntityId !== null &&
    lookup.data?.find(
      (item) =>
        item.performingBiologicEntity?.id ===
        form.values.performingBiologicEntityId
    );

  const mutation = useMutation({
    mutationFn: (newStudySubject: NewStudySubject) =>
      api.subjects.createSpaceSpaceIdSubjectPost({
        spaceId,
        newStudySubject,
      }),
    onSuccess: (subj) =>
      navigate({
        to: SubjectIdRoute.to,
        params: { spaceId, subjectId: subj.id },
      }),
  });

  return (
    <>
      {mutation.isError && <Alert color="red">{mutation.error.message}</Alert>}
      {!mutation.isPending && (
        <form onSubmit={form.onSubmit((x) => mutation.mutate(x))}>
          <Grid>
            <Grid.Col span={6}>
              <Stack>
                {selectedLookup ? (
                  <PerformingBiologicEntityCard
                    form={form}
                    subject={selectedLookup}
                  />
                ) : (
                  <PerformingBiologicEntityFields form={form} />
                )}
                <StudySubjectFields form={form} />
              </Stack>
            </Grid.Col>
            <Grid.Col span={4}>
              <PerformingBiologicEntitySelect
                data={lookup.data || []}
                {...form.getInputProps("performingBiologicEntityId")}
              />
            </Grid.Col>
          </Grid>
          <Button mt="md" type="submit">
            {t("submit")}
          </Button>
        </form>
      )}
    </>
  );
}
