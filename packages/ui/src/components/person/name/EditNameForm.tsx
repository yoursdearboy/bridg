import { useMutation } from "@tanstack/react-query";
import api from "@/api";
import { NameForm } from "./NameForm";
import type { EntityName, EntityNameData } from "api-ts";

interface Props {
  personId: string;
  name: EntityName;
  onClose: () => void;
  onSuccess: () => void;
}

export const EditNameForm = ({ personId, name, onClose, onSuccess }: Props) => {
  const mutation = useMutation({
    mutationFn: (data: EntityNameData) =>
      api.persons.updatePersonsPersonIdNamesNameIdPatch({
        personId,
        nameId: name.id,
        entityNameData: data,
      }),
    onSuccess,
  });

  return (
    <NameForm
      personId={personId}
      onSuccess={onSuccess}
      initialValues={name}
      onSubmit={(data) => mutation.mutate(data)}
      onClose={onClose}
    />
  );
};
