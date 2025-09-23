import { useMutation } from "@tanstack/react-query";
import { type TelecommunicationAddressData } from "api-ts";
import api from "@/api";
import { TelecommunicationAddressForm } from "./TelecommunicationAddressForm";

interface Props {
  personId: string;
  onCancel: () => void;
  onSuccess: () => void;
}

export const NewTelecommunicationAddressForm = ({
  personId,
  onCancel,
  onSuccess,
}: Props) => {
  const mutation = useMutation({
    mutationKey: ["person", personId, "telecommunication_addresses"],
    mutationFn: (data: TelecommunicationAddressData) =>
      api.persons.createPersonsPersonIdTelecommunicationAddressesPost({
        personId,
        telecommunicationAddressData: data,
      }),

    onSuccess,
  });

  return (
    <TelecommunicationAddressForm
      onCancel={onCancel}
      initialValues={{}}
      mutation={mutation}
    />
  );
};
