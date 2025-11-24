import { Alert, Button, Group, Select, Stack, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { Status, type StudySubject } from "api-ts";
import { useTranslation } from "react-i18next";
import api from "@/api";
import { Route as SpacesSpaceidSubjectsSubjectIdRoute } from "@/routes/spaces/$spaceId/subjects/$subjectId";

interface InputProps {
  onChange: (value: string | null) => void;
}

interface SpaceRedirectFormProps {
  subject: StudySubject;
  onCancel: () => void;
  onSuccess: () => void;
}

interface SpaceRedirectFormData {
  spaceId: string;
  studySiteId: string;
}

export const SpaceRedirectForm = ({
  subject,
  onCancel,
  onSuccess,
}: SpaceRedirectFormProps) => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: ({ spaceId, studySiteId }: SpaceRedirectFormData) =>
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
    onSuccess: ({ id: subjectId }, { spaceId }) => {
      onSuccess();
      return navigate({
        to: SpacesSpaceidSubjectsSubjectIdRoute.to,
        params: { spaceId, subjectId },
      });
    },
  });

  const form = useForm<SpaceRedirectFormData>({
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
      label={t("SpaceRedirecForm.space")}
      data={(data || []).map((s) => ({
        value: s.id,
        label: s.label || t("StudySite.defaultLabel"),
      }))}
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
      label={t("SpaceRedirecForm.studySite")}
      data={(data || []).map((s) => ({
        value: s.id,
        label: s.executingStudySite.label || t("StudySite.defaultLabel"),
      }))}
      onChange={onChange}
      required
    />
  );
};
