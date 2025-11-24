import { Alert, Button, Group, Modal, Radio, Stack } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { IconPencil } from "@tabler/icons-react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { Status, type StudySubject, type StudySubjectData } from "api-ts";
import { useTranslation } from "react-i18next";
import api from "@/api";
import { Route as SubjectRoute } from "@/routes/spaces/$spaceId/subjects/$subjectId/index";
import { statusColor } from "./StatusColor";

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
      {subject.status == Status.Ineligible ? (
        <Button radius={"lg"} color={statusColor(subject.status)}>
          {t(`Status.${subject.status}`)}
        </Button>
      ) : (
        <Button
          radius={"lg"}
          color={statusColor(subject.status)}
          onClick={open}
          leftSection={<IconPencil />}
        >
          {t(`Status.${subject.status!}`)}
        </Button>
      )}
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
          status={subject.status!}
          onCancel={close}
          onSuccess={() => close()}
        />
      </Modal>
    </>
  );
}

interface NewStatusFormProps {
  spaceId: string;
  subjectId: string;
  subject: StudySubject;
  status: Status;
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
  const handleSubmit = (data: StudySubjectData) => {
    return mutation.mutate(data);
  };
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
                <Radio
                  mt={"xs"}
                  value={status}
                  label={t(`Status.${status}`)}
                ></Radio>
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

const transitionFrom = (status: Status) => {
  switch (status) {
    case Status.PotentialCandidate:
      return [Status.Candidate];
    case Status.Candidate:
      return [Status.Screening, Status.Eligible];
    case Status.Eligible:
      return [
        Status.Eligible,
        Status.Withdrawn,
        Status.Candidate,
        Status.PendingOnStudy,
      ];
    case Status.Screening:
      return [Status.Withdrawn, Status.Eligible, Status.Ineligible];
    case Status.PendingOnStudy:
      return [Status.OnStudy, Status.NotRegistered, Status.Ineligible];
    case Status.FollowUp:
      return [Status.OffStudy];
    default:
      return [];
  }
};
