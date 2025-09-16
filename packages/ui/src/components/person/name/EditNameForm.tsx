import { useMutation } from "@tanstack/react-query";
import type { EntityName, EntityNameData } from "api-ts";
import api from "@/api";
import { NameForm } from "./NameForm";

interface Props {
  personId: string;
  name: EntityName;
  onCancel: () => void;
  onSuccess: () => void;
}

export const EditNameForm = ({
  personId,
  name,
  onCancel,
  onSuccess,
}: Props) => {
  const mutation = useMutation({
    mutationKey: ["person", personId, "names", name.id],
    mutationFn: (data: EntityNameData) =>
      api.persons.updatePersonsPersonIdNamesNameIdPatch({
        personId,
        nameId: name.id,
        entityNameData: data,
      }),
    onSuccess,
  });

  return (
    <NameForm mutation={mutation} initialValues={name} onCancel={onCancel} />
  );
};
