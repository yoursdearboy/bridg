import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Text,
  Card,
  Stack,
  Group,
  Badge,
  Divider,
  Button,
  TextInput,
  Select,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import api from "@/api";
// import { useTranslation } from "react-i18next";

export const Route = createFileRoute("/persons/$personId/edit")({
  component: EditPersonComponent,
  loader: async ({ params }) => {
    if (!params.personId) throw new Error("personId is required");
    return api.persons.showPersonsPersonIdGet({ personId: params.personId });
  },
  beforeLoad: () => ({
    breadcrumb: "Edit Person",
  }),
});

function EditPersonComponent() {
  const person = Route.useLoaderData();
  // const { t } = useTranslation();

  const form = useForm({
    initialValues: {
      primaryName: person?.primaryName || "",
      administrativeGenderCode: person?.administrativeGenderCode || "",
      birthDate: person?.birthDate ? new Date(person.birthDate) : null,
      deathIndicator: person?.deathIndicator || false,
      deathDate: person?.deathDate ? new Date(person.deathDate) : null,
    },
  });

  const handleSubmit = (values: typeof form.values) => {
    console.log("Submitting:", values);
  };

  if (!person) {
    return (
      <Card withBorder>
        <Text color="red">Person not found</Text>
        <Button component={Link} to="/persons" mt="md">
          Back to Persons List
        </Button>
      </Card>
    );
  }

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack gap="md">
        <Group justify="space-between">
          <Group>
            <Text size="xl" fw={700}>
              Editing: {person.primaryName?.trim()}
            </Text>
            {person.deathIndicator && (
              <Badge color="red" ml="sm">
                Deceased
              </Badge>
            )}
          </Group>
          <Button component={Link} to="/persons/$personId" variant="subtle">
            Cancel
          </Button>
        </Group>

        {/* Основная информация */}
        <Card withBorder shadow="sm" padding="lg" radius="md">
          <Stack gap="sm">
            <Text size="xl" fw={700}>
              Personal Information
            </Text>
            <Divider my="xs" />

            <TextInput
              label="Full Name"
              placeholder="Enter full name"
              {...form.getInputProps("primaryName")}
            />

            <Select
              label="Gender"
              placeholder="Select gender"
              data={[
                { value: "male", label: "Male" },
                { value: "female", label: "Female" },
                { value: "other", label: "Other" },
              ]}
              {...form.getInputProps("administrativeGenderCode")}
            />

            <Group>
              <Button type="submit" variant="filled">
                Save Changes
              </Button>
              <Button
                variant="outline"
                component={Link}
                to="/persons/$personId"
              >
                Discard Changes
              </Button>
            </Group>
          </Stack>
        </Card>

        <Card withBorder shadow="sm" padding="lg" radius="md">
          <Group justify="space-between" align="center">
            <Text size="xl" fw={700}>
              Names
            </Text>
            <Button
              variant="outline"
              onClick={() => console.log("Add new name")}
            >
              Add Name
            </Button>
          </Group>
        </Card>

        <Card withBorder shadow="sm" padding="lg" radius="md">
          <Group justify="space-between" align="center">
            <Text size="xl" fw={700}>
              Addresses
            </Text>
            <Button
              variant="outline"
              onClick={() => console.log("Add new address")}
            >
              Add Address
            </Button>
          </Group>
        </Card>
      </Stack>
    </form>
  );
}
