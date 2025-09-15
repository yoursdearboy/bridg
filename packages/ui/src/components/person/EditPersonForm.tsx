import { useMutation } from "@tanstack/react-query";
import api from "@/api";
import { PersonForm } from "./PersonForm";
import { type Person, type PersonData } from "api-ts";

interface Props {
  person: Person;
  onCancel: () => void;
  onSuccess: () => void;
}

export const EditPersonForm = ({ person, onCancel, onSuccess }: Props) => {
  const mutation = useMutation({
    mutationKey: ["person", person.id],
    mutationFn: (data: PersonData) =>
      api.persons.updatePersonsPersonIdPatch({
        personId: person.id,
        personData: data,
      }),
    onSuccess,
  });

  return (
    <PersonForm
      onCancel={onCancel}
      initialValues={person}
      mutation={mutation}
    />
  );
};
