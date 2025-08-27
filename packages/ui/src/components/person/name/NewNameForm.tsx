import { useMutation } from "@tanstack/react-query";
import api from "@/api";
import { NameForm } from "./NameForm";
import { type EntityNameData } from "api-ts";

interface Props {
  personId: string;
  onCancel: () => void;
  onSuccess: () => void;
}

export const NewNameForm = ({ personId, onCancel, onSuccess }: Props) => {
  const mutation = useMutation({
    mutationFn: (data: EntityNameData) =>
      api.persons.createPersonsPersonIdNamesPost({
        personId,
        entityNameData: data,
      }),
    onSuccess,
  });

  return (
    <NameForm onCancel={onCancel} initialValues={{}} mutation={mutation} />
  );
};
