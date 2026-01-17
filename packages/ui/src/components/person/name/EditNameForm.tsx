import type { BiologicEntityName, BiologicEntityNameData } from "@bridg/api-ts";
import { useMutation } from "@tanstack/react-query";
import api from "@/api";
import { NameForm } from "./NameForm";

interface Props {
  personId: string;
  name: BiologicEntityName;
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
    mutationFn: (data: BiologicEntityNameData) =>
      api.updatePersonName({
        personId,
        nameId: name.id,
        biologicEntityNameData: data,
      }),
    onSuccess,
  });

  return (
    <NameForm mutation={mutation} initialValues={name} onCancel={onCancel} />
  );
};
