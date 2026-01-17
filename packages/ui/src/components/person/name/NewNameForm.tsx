import { type BiologicEntityNameData } from "@bridg/api-ts";
import { useMutation } from "@tanstack/react-query";
import api from "@/api";
import { NameForm } from "./NameForm";

interface Props {
  personId: string;
  onCancel: () => void;
  onSuccess: () => void;
}

export const NewNameForm = ({ personId, onCancel, onSuccess }: Props) => {
  const mutation = useMutation({
    mutationKey: ["person", personId, "names"],
    mutationFn: (data: BiologicEntityNameData) =>
      api.createPersonName({
        personId,
        biologicEntityNameData: data,
      }),
    onSuccess,
  });

  return (
    <NameForm onCancel={onCancel} initialValues={{}} mutation={mutation} />
  );
};
