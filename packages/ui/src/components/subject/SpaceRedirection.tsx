import api from "@/api";
import {
  Alert,
  Button,
  Group,
  LoadingOverlay,
  Modal,
  MultiSelect,
  Radio,
  Stack,
  Text,
} from "@mantine/core";
import { useForm, type UseFormReturnType } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { IconArrowRight, IconPencil } from "@tabler/icons-react";
import { useMutation, useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { Status, type NewStudySubject, type StudySubject } from "api-ts";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Route as SpaceRoute } from "@/routes/spaces/$spaceId/subjects/index";

interface Props {
  status: Status;
  subject: StudySubject;
}

export function SpaceRedirection({ status, subject }: Props) {
  const { t } = useTranslation();
  const [opened, { open, close }] = useDisclosure(false);
  if (status != Status.Ineligible) return null;

  return (
    <>
      <IconArrowRight size={24} />
      <Button
        radius={"lg"}
        variant="outline"
        color={"blue"}
        onClick={open}
        leftSection={<IconPencil></IconPencil>}
      >
        {t("SpaceRedirection.changeSpace")}
      </Button>
      <Modal
        opened={opened}
        onClose={close}
        title={t("SpaceRedirection.editModalTitle")}
        size="lg"
      >
        <RedirectionForm subject={subject} onCancel={close} />
      </Modal>
    </>
  );
}

interface RedirectionFormProps {
  subject: StudySubject;
  onCancel: () => void;
}

const RedirectionForm = ({ subject, onCancel }: RedirectionFormProps) => {
  return (
    <>
      <ToNewStudyForm subject={subject} onCancel={onCancel} />
    </>
  );
};

interface ToNewStudyFormProps {
  subject: StudySubject;
  onCancel: () => void;
}

const ToNewStudyForm = ({ subject, onCancel }: ToNewStudyFormProps) => {
  const { t } = useTranslation();
  const {
    isPending,
    isError,
    error,
    data: spaces,
  } = useQuery({
    queryKey: ["spaces"],
    queryFn: () => api.spaces.indexSpacesGet(),
  });

  if (isPending) return <LoadingOverlay />;
  if (isError)
    return (
      <Text color="red">{t("errorMessage", { error: error.message })}</Text>
    );

  const form = useForm<NewStudySubject>({
    initialValues: {
      performingBiologicEntity: subject.performingBiologicEntity,
      status: Status.Candidate,
      statusDate: new Date(),
      assignedStudySiteProtocolVersionRelationship: [],
      performingBiologicEntityId: subject.performingBiologicEntity!.id,
    },
    transformValues: (values: NewStudySubject) => ({
      ...values,
    }),
  });

  const [spaceId, setSpaceId] = useState(String);
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: ({
      newStudySubject,
      spaceId,
    }: {
      newStudySubject: NewStudySubject;
      spaceId: string;
    }) =>
      api.subjects.createSpacesSpaceIdSubjectsPost({
        spaceId,
        newStudySubject,
      }),
    onSuccess: () => navigate({ to: SpaceRoute.to, params: { spaceId } }),
  });

  const handleSubmit = (data: NewStudySubject) => {
    return mutation.mutate({ newStudySubject: data, spaceId });
  };

  return (
    <>
      {mutation.isError && <Alert color="red">{mutation.error.message}</Alert>}
      {!mutation.isPending && (
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack gap={"md"} pos="relative">
            <Radio.Group name="spaceId" label="Выберите новый протокол">
              {spaces.map((space) => (
                <Radio
                  mt={"xs"}
                  value={space.id}
                  label={space.label}
                  required
                  onChange={(event) => setSpaceId(event.currentTarget.value)}
                ></Radio>
              ))}
            </Radio.Group>
            {spaceId ? (
              <StudySiteSelector spaceId={spaceId} form={form} />
            ) : null}
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

interface StudySiteSelectorProps {
  spaceId: string;
  form: UseFormReturnType<NewStudySubject>;
}

const StudySiteSelector = ({ spaceId, form }: StudySiteSelectorProps) => {
  const {
    isPending,
    isError,
    error,
    data: sites,
  } = useSuspenseQuery({
    queryKey: ["spaces", spaceId, "sites"],
    queryFn: async () =>
      await api.sites.indexSpacesSpaceIdSitesGet({ spaceId }),
  });
  const { t } = useTranslation();

  if (isPending) return <LoadingOverlay />;
  if (isError)
    return (
      <Text color="red">{t("errorMessage", { error: error.message })}</Text>
    );

  return (
    <>
      <MultiSelect
        label={t("StudySubject.assignedStudySiteProtocolVersionRelationship")}
        data={sites.map((s) => ({
          value: s.id,
          label: s.executingStudySite.label || t("StudySite.defaultLabel"),
        }))}
        {...form.getInputProps("assignedStudySiteProtocolVersionRelationship")}
      />
    </>
  );
};
