import api from "@/api";
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
  AdministrativeGender,
  type FoundStudySubject,
  type NewStudySubject,
  Status,
} from "bridg-ts";
import dayjs from "dayjs";

export const Route = createFileRoute("/spaces/$spaceId/subjects/new")({
  loader: async ({ params }) => ({
    sites: await api.sites.indexSpacesSpaceIdSitesGet(params),
  }),
  beforeLoad: () => ({
    breadcrumb: "New subject",
  }),
  component: RouteComponent,
});

type NewStudySubjectFormProps = {
  form: UseFormReturnType<NewStudySubject>;
};

const PerformingBiologicEntityFields = ({ form }: NewStudySubjectFormProps) => {
  const genders = Object.entries(AdministrativeGender).map(([key, value]) => ({
    label: key,
    value,
  }));

  return (
    <>
      <Card>
        <Flex gap="md">
          <TextInput
            label="Family"
            {...form.getInputProps("performingBiologicEntity.name.family")}
          />
          <TextInput
            label="Given"
            {...form.getInputProps("performingBiologicEntity.name.given")}
          />
          <TextInput
            label="Patronymic"
            {...form.getInputProps("performingBiologicEntity.name.patronymic")}
          />
        </Flex>
      </Card>

      <Card>
        <Stack align="flex-start" gap="md">
          <Select
            label="Administrative gender"
            data={genders}
            {...form.getInputProps(
              "performingBiologicEntity.administrativeGenderCode"
            )}
          />
          <DateInput
            label="Birth date"
            valueFormat="YYYY-MM-DD"
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
  return (
    <Card style={{ width: 300 }}>
      <Text fw={500} mb="sm">
        Select existing biologic entity:
      </Text>
      <Combobox
        store={store}
        onOptionSubmit={(selectedValue) => {
          const newValue = selectedValue === value ? null : selectedValue;
          onChange(newValue);
        }}
      >
        <Combobox.Options>
          {data &&
            data.map((subject) => (
              <Combobox.Option
                key={subject.performingBiologicEntityId}
                value={subject.performingBiologicEntityId!}
                bg={
                  (subject.performingBiologicEntityId === value &&
                    "var(--mantine-color-dark-7)") ||
                  ""
                }
              >
                {subject.performingBiologicEntity}
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
} & NewStudySubjectFormProps) => (
  <Card>
    <Group gap="xs">
      <Text fw={500}>{subject.performingBiologicEntity}</Text>
      <CloseButton
        onClick={() => form.resetField("performingBiologicEntityId")}
      />
    </Group>
  </Card>
);

const StudySubjectFields = ({ form }: NewStudySubjectFormProps) => {
  const { sites } = Route.useLoaderData();
  const statuses = Object.entries(Status).map(([key, value]) => ({
    label: key,
    value,
  }));

  return (
    <>
      <Card>
        <Stack align="flex-start" gap="md">
          <Select
            label="Status"
            data={statuses}
            {...form.getInputProps("status")}
          />
          <DateInput
            label="Status date"
            valueFormat="YYYY-MM-DD"
            {...form.getInputProps("statusDate")}
          />
          <MultiSelect
            label="Study sites"
            data={sites.map((s) => ({
              value: s.id,
              label: s.executingStudySite,
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

  const lookup = useQuery({
    queryKey: [],
    queryFn: () =>
      api.subjects.lookupSpacesSpaceIdSubjectsLookupPost({
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
        name: {
          family: "",
          given: "",
          patronymic: "",
        },
      },
      performingBiologicEntityId: null,
      status: Status.Candidate,
      statusDate: new Date(),
      assignedStudySiteProtocolVersionRelationship: [],
    },
    onValuesChange: () => doLookup(),
    transformValues: (values: NewStudySubject) => {
      if (values?.performingBiologicEntity?.birthDate) {
        values.performingBiologicEntity.birthDate = dayjs(
          values.performingBiologicEntity.birthDate
        ).toDate();
      }
      if (values.statusDate) {
        values.statusDate = dayjs(values.statusDate).toDate();
      }
      return values;
    },
    validate: {
      assignedStudySiteProtocolVersionRelationship: hasLength({ min: 1 }),
    },
  });

  const selectedLookup =
    form.values.performingBiologicEntityId !== null &&
    lookup.data?.find(
      (item) =>
        item.performingBiologicEntityId ===
        form.values.performingBiologicEntityId
    );

  const mutation = useMutation({
    mutationFn: (newStudySubject: NewStudySubject) =>
      api.subjects.createSpacesSpaceIdSubjectsPost({
        spaceId,
        newStudySubject,
      }),
    onSuccess: () => navigate({ to: ".." }),
  });

  return (
    <>
      {mutation.isError && <Alert color="red">{mutation.error.message}</Alert>}
      {!mutation.isPending && (
        <form onSubmit={form.onSubmit((x) => mutation.mutate(x))}>
          <Grid>
            <Grid.Col span={6}>
              <Stack>
                {(selectedLookup && (
                  <PerformingBiologicEntityCard
                    form={form}
                    subject={selectedLookup}
                  />
                )) || <PerformingBiologicEntityFields form={form} />}
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
            Submit
          </Button>
        </form>
      )}
    </>
  );
}
