import { Alert, Button, Group, Modal, Radio, Stack } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { Status, type StudySubject, type StudySubjectData } from "api-ts";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import api from "@/api";
import { getStatusColor, getStatusTransitions, STATUSES } from "@/model";
import { Route as SubjectRoute } from "@/routes/spaces/$spaceId/subjects/$subjectId/index";

interface StatusButtonProps {
  spaceId: string;
  subjectId: string;
  subject: StudySubject;
}

export function StatusButton({
  spaceId,
  subjectId,
  subject,
}: StatusButtonProps) {
  const { t } = useTranslation();
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <>
      <Button
        size="sm"
        color={getStatusColor(subject.status)}
        onClick={open}
        variant="light"
      >
        {subject.status ? t(`Status.${subject.status}`) : t("no")}
      </Button>
      <Modal
        opened={opened}
        onClose={close}
        title={t("StatusButton.editModalTitle")}
        size="lg"
      >
        <StatusForm
          spaceId={spaceId}
          subjectId={subjectId}
          status={subject.status}
          onCancel={close}
          onSuccess={close}
        />
      </Modal>
    </>
  );
}

interface StatusFormProps {
  spaceId: string;
  subjectId: string;
  status: Status | null;
  onCancel: () => void;
  onSuccess: () => void;
}

const StatusForm = ({
  spaceId,
  subjectId,
  status,
  onCancel,
  onSuccess,
}: StatusFormProps) => {
  const [checked, toggleChecked] = useState(false);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const statuses = checked ? STATUSES : getStatusTransitions(status);
  const form = useForm<StudySubjectData>({
    initialValues: {
      status: status,
      statusDate: new Date(),
    },
    transformValues: (values: StudySubjectData) => ({
      ...values,
      statusDate: values.statusDate && new Date(values.statusDate),
    }),
  });
  const mutation = useMutation({
    mutationFn: (studySubjectData: StudySubjectData) =>
      api.subjects.updateSpacesSpaceIdSubjectsSubjectIdPatch({
        spaceId,
        subjectId,
        studySubjectData,
      }),
    onSuccess: () => {
      onSuccess();
      return navigate({ to: SubjectRoute.to, params: { spaceId, subjectId } });
    },
  });
  const handleSubmit = (data: StudySubjectData) => mutation.mutate(data);
  return (
    <>
      {mutation.isError && <Alert color="red">{mutation.error.message}</Alert>}
      {!mutation.isPending && (
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack gap="md">
            <DateInput
              label={t("StudySubject.statusDate")}
              valueFormat="L"
              {...form.getInputProps("statusDate")}
            />
            <Radio.Group
              name="status"
              label={t("StatusButton.newStatus")}
              {...form.getInputProps("status")}
            >
              <Stack mt="xs">
                {statuses.map((status) => (
                  <Radio
                    fw={500}
                    c={getStatusColor(status)}
                    value={status}
                    label={t(`Status.${status}`)}
                  />
                ))}
              </Stack>
            </Radio.Group>
            <Button
              size="xs"
              variant="subtle"
              color="grey"
              onClick={() => toggleChecked(!checked)}
            >
              {checked ? t("StatusButton.expand") : t("StatusButton.collapse")}
            </Button>
            <Group justify="flex-end" mt="md">
              <Button variant="outline" onClick={onCancel}>
                {t("cancel")}
              </Button>
              <Button type="submit">{t("submit")}</Button>
            </Group>
          </Stack>
        </form>
      )}
    </>
  );
};
