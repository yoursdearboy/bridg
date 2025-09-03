import { useMutation } from "@tanstack/react-query";
import api from "@/api";
import { PersonForm } from "./PersonForm";
import { type PersonData } from "api-ts";

interface Props {
  personId: string,
  person: PersonData,
  onCancel: () => void;
  onSuccess: () => void;
}

export const EditPersonForm = ({ personId, person, onCancel, onSuccess }: Props) => {
  const mutation = useMutation({
    mutationKey: ["person", personId, "edit"],
    mutationFn: (data: PersonData) =>
      api.persons.updatePersonsPersonIdPatchRaw({
        personId,
        personData: data,
      }),
    onSuccess,
  });

  return (
    <PersonForm onCancel={onCancel} initialValues={person} mutation={mutation} />
  );
};
