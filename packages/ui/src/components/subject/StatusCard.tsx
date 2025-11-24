import { Alert, Button, Group, Modal, Radio, Stack } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { Status, type StudySubject, type StudySubjectData } from "api-ts";
import { useTranslation } from "react-i18next";
import api from "@/api";
import { Route as SubjectRoute } from "@/routes/spaces/$spaceId/subjects/$subjectId/index";

interface SubjectCardProps {
  spaceId: string;
  subjectId: string;
  subject: StudySubject;
}

export function StatusCard({ spaceId, subjectId, subject }: SubjectCardProps) {
  const { t } = useTranslation();
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <>
      <Button
        size="xs"
        color={statusColor(subject.status)}
        onClick={() => subject.status != Status.Ineligible && open()}
      >
        {subject.status ? t(`Status.${subject.status}`) : t("no")}
      </Button>
      <Modal
        opened={opened}
        onClose={close}
        title={t("StatusCard.editModalTitle")}
        size="lg"
      >
        <NewStatusForm
          spaceId={spaceId}
          subjectId={subjectId}
          subject={subject}
          status={subject.status}
          onCancel={close}
          onSuccess={close}
        />
      </Modal>
    </>
  );
}

interface NewStatusFormProps {
  spaceId: string;
  subjectId: string;
  subject: StudySubject;
  status: Status | null;
  onCancel: () => void;
  onSuccess: () => void;
}

const NewStatusForm = ({
  spaceId,
  subjectId,
  subject,
  status,
  onCancel,
  onSuccess,
}: NewStatusFormProps) => {
  const statusesTo = transitionFrom(status);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const form = useForm<StudySubjectData>({
    initialValues: {
      status: subject.status,
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
          <Stack gap={"md"} pos="relative">
            <DateInput
              label={t("StudySubject.statusDate")}
              valueFormat="L"
              {...form.getInputProps("statusDate")}
            />
            <Radio.Group
              name="status"
              label="Выберите новый статус"
              {...form.getInputProps("status")}
            >
              {statusesTo.map((status) => (
                <Radio mt="xs" value={status} label={t(`Status.${status}`)} />
              ))}
            </Radio.Group>
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

const transitionFrom = (status: Status | null) => {
  switch (status) {
    case null:
      return [Status.PotentialCandidate, Status.Candidate];
    case Status.PotentialCandidate:
      return [Status.Candidate];
    case Status.Candidate:
      return [Status.Screening, Status.Eligible];
    case Status.Screening:
      return [Status.Eligible, Status.Ineligible, Status.Withdrawn];
    case Status.Eligible:
      return [Status.PendingOnStudy, Status.Candidate, Status.Withdrawn];
    case Status.PendingOnStudy:
      return [Status.OnStudy, Status.NotRegistered, Status.Ineligible];
    case Status.OnStudy:
    case Status.OnStudyIntervention:
    case Status.OnStudyObservation:
      return [
        Status.OnStudyIntervention,
        Status.OnStudyObservation,
        Status.FollowUp,
        Status.OffStudy,
      ];
    case Status.FollowUp:
      return [Status.OffStudy];
    default:
      return [];
  }
};

const statusColor = (status: Status | null): string => {
  switch (status) {
    case Status.Withdrawn:
    case Status.NotRegistered:
    case Status.Ineligible:
      return "red";
    case Status.OnStudy:
    case Status.OnStudyIntervention:
    case Status.OnStudyObservation:
      return "green";
    default:
      return "blue";
  }
};
