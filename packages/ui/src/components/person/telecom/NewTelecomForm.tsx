import { useMutation } from "@tanstack/react-query";
import { type TelecommunicationAddressData } from "api-ts";
import api from "@/api";
import { TelecomForm } from "./TelecomForm";

interface Props {
  personId: string;
  onCancel: () => void;
  onSuccess: () => void;
}

export const NewTelecomForm = ({ personId, onCancel, onSuccess }: Props) => {
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
    <TelecomForm onCancel={onCancel} initialValues={{}} mutation={mutation} />
  );
};
