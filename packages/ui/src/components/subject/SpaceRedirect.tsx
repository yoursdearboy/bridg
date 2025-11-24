import {
  Alert,
  Button,
  Group,
  Modal,
  Select,
  Stack,
  Text,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { type UseDisclosureReturnValue } from "@mantine/hooks";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { Status, type StudySubject } from "api-ts";
import { useTranslation } from "react-i18next";
import api from "@/api";
import { Route as SpacesSpaceidSubjectsSubjectIdRoute } from "@/routes/spaces/$spaceId/subjects/$subjectId";

interface InputProps {
  onChange: (value: string | null) => void;
}

interface SpaceRedirectionModalProps {
  subject: StudySubject;
  disclosure: UseDisclosureReturnValue;
}

export function SpaceRedirectionModal({
  subject,
  disclosure,
}: SpaceRedirectionModalProps) {
  const { t } = useTranslation();
  const [opened, { close }] = disclosure;

  return (
    <Modal
      opened={opened}
      onClose={close}
      title={t("SpaceRedirection.editModalTitle")}
      size="lg"
    >
      <ToNewStudyForm subject={subject} onCancel={close} />
    </Modal>
  );
}

interface ToNewStudyFormProps {
  subject: StudySubject;
  onCancel: () => void;
}

interface ToNewStudyFormData {
  spaceId: string;
  studySiteId: string;
}

const ToNewStudyForm = ({ subject, onCancel }: ToNewStudyFormProps) => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: ({ spaceId, studySiteId }: ToNewStudyFormData) =>
      api.subjects.createSpacesSpaceIdSubjectsPost({
        spaceId,
        newStudySubject: {
          status: Status.PotentialCandidate,
          statusDate: new Date(),
          assignedStudySiteProtocolVersionRelationship: [studySiteId],
          performingBiologicEntity: null,
          performingBiologicEntityId: subject.performingBiologicEntity!.id,
        },
      }),
    onSuccess: ({ id: subjectId }, { spaceId }) =>
      navigate({
        to: SpacesSpaceidSubjectsSubjectIdRoute.to,
        params: { spaceId, subjectId },
      }),
  });

  const form = useForm<ToNewStudyFormData>({
    initialValues: {
      spaceId: "",
      studySiteId: "",
    },
  });

  return (
    <>
      {mutation.isError && <Alert color="red">{mutation.error.message}</Alert>}
      {!mutation.isPending && (
        <form onSubmit={form.onSubmit((x) => mutation.mutate(x))}>
          <Stack gap={"md"} pos="relative">
            <SpaceSelect {...form.getInputProps("spaceId")} />
            {form.values.spaceId && (
              <StudySiteSelect
                spaceId={form.values.spaceId}
                {...form.getInputProps("studySiteId")}
              />
            )}
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

const SpaceSelect = ({ onChange }: InputProps) => {
  const { t } = useTranslation();
  const { isError, error, data } = useQuery({
    queryKey: ["spaces"],
    queryFn: () => api.spaces.indexSpacesGet(),
  });

  if (isError)
    return <Text c="red">{t("errorMessage", { error: error.message })}</Text>;

  return (
    <Select
      data={(data || []).map((s) => ({ value: s.id, label: s.label || "" }))}
      onChange={onChange}
      required
    />
  );
};

const StudySiteSelect = ({
  spaceId,
  onChange,
}: { spaceId: string } & InputProps) => {
  const { t } = useTranslation();
  const { isError, error, data } = useQuery({
    queryKey: ["spaces", spaceId, "sites"],
    queryFn: () => api.sites.indexSpacesSpaceIdSitesGet({ spaceId }),
  });

  if (isError)
    return <Text c="red">{t("errorMessage", { error: error.message })}</Text>;

  return (
    <Select
      label={t("StudySubject.assignedStudySiteProtocolVersionRelationship")}
      data={(data || []).map((s) => ({
        value: s.id,
        label: s.executingStudySite.label || t("StudySite.defaultLabel"),
      }))}
      onChange={onChange}
      required
    />
  );
};
