import api from "@/api";
import {
  Alert,
  Button,
  Card,
  Flex,
  MultiSelect,
  Select,
  Stack,
  Group,
  Text,
  TextInput,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { hasLength, useForm } from "@mantine/form";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AdministrativeGender, type NewStudySubject, Status } from "bridg-ts";
import dayjs from "dayjs";
import { useState, useMemo } from "react";

export const Route = createFileRoute("/spaces/$spaceId/subjects/new")({
  loader: async ({ params }) => ({
    sites: await api.sites.indexSpacesSpaceIdSitesGet(params),
    subjects: await api.subjects.indexSpacesSpaceIdSubjectsGet(params), // Добавляем загрузку субъектов
  }),
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const { spaceId } = Route.useParams();

  const { sites, subjects } = Route.useLoaderData();
  const [searchQuery, setSearchQuery] = useState("");

  const [isSearchActive, setIsSearchActive] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.currentTarget.value);
    setIsSearchActive(e.currentTarget.value.length > 0);
  };

  const filteredSubjects = useMemo(() => {
    if (!searchQuery) return subjects;

    return subjects.filter((subject) => {
      const searchLower = searchQuery.toLowerCase();
      const primaryName =
        subject.performingBiologicEntity?.primaryName?.toLowerCase() || "";

      return primaryName.includes(searchLower);
    });
  }, [subjects, searchQuery]);

  const genders = Object.entries(AdministrativeGender).map(([key, value]) => ({
    label: key,
    value,
  }));
  const statuses = Object.entries(Status).map(([key, value]) => ({
    label: key,
    value,
  }));
  const initialValues: NewStudySubject = {
    performingBiologicEntity: {
      administrativeGenderCode: null,
      birthDate: null,
      name: {},
    },
    status: Status.Candidate,
    statusDate: new Date(),
    assignedStudySiteProtocolVersionRelationship: [],
  };
  const form = useForm<NewStudySubject>({
    mode: "uncontrolled",
    initialValues,
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
      <Card withBorder mb="md">
        <Group justify="space-between" mb="md">
          <Text fw={500} size="lg">
            Existing Patients
          </Text>
          <TextInput
            placeholder="Search patients..."
            value={searchQuery}
            onChange={handleSearchChange}
            style={{ width: 300 }}
          />
        </Group>

        {isSearchActive && // Показываем результаты только при активном поиске
          (filteredSubjects.length > 0 ? (
            <Stack gap="xs">
              {filteredSubjects.map((subject) => (
                <Card withBorder key={subject.id} padding="sm">
                  <Text>
                    {subject.performingBiologicEntity?.primaryName?.trim()}
                  </Text>
                  <Text size="sm" c="dimmed">
                    {subject.performingBiologicEntity
                      ?.administrativeGenderCode &&
                      `${subject.performingBiologicEntity.administrativeGenderCode}, `}
                    {subject.performingBiologicEntity?.birthDate &&
                      `Born: ${dayjs(subject.performingBiologicEntity.birthDate).format("YYYY-MM-DD")}`}
                  </Text>
                </Card>
              ))}
            </Stack>
          ) : (
            <Text c="dimmed" ta="center" py="md">
              No matching patients found
            </Text>
          ))}
      </Card>

      {!mutation.isPending && (
        <form
          onSubmit={form.onSubmit((x) => mutation.mutate(x))}
          style={{ maxWidth: 600 }}
        >
          <Stack gap="md">
            <Card withBorder>
              <Flex gap="md">
                <TextInput
                  label="Family"
                  {...form.getInputProps(
                    "performingBiologicEntity.name.family"
                  )}
                />
                <TextInput
                  label="Given"
                  {...form.getInputProps("performingBiologicEntity.name.given")}
                />
                <TextInput
                  label="Patronymic"
                  {...form.getInputProps(
                    "performingBiologicEntity.name.patronymic"
                  )}
                />
              </Flex>
            </Card>

            <Card withBorder>
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

            <Card withBorder>
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
            <Button type="submit">Submit</Button>
          </Stack>
        </form>
      )}
    </>
  );
}
