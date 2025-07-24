import api from "@/api";
import {
  Button,
  Flex,
  MultiSelect,
  Select,
  Stack,
  TextInput,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { createFileRoute } from "@tanstack/react-router";
import { AdministrativeGender, type NewStudySubject, Status } from "bridg-ts";
import dayjs from "dayjs";

export const Route = createFileRoute("/spaces/$spaceId/subjects/new")({
  loader: async ({ params }) => ({
    sites: await api.sites.indexSpacesSpaceIdSitesGet(params),
  }),
  component: RouteComponent,
});

function RouteComponent() {
  const { sites } = Route.useLoaderData();
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
    transformValues: (values) => ({
      statusDate: dayjs(values.statusDate).toDate(),
      ...values,
    }),
  });
  return (
    <form
      onSubmit={form.onSubmit((values) => {
        console.log(values);
      })}
    >
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
        <Button type="submit">Submit</Button>
      </Stack>
    </form>
  );
}
