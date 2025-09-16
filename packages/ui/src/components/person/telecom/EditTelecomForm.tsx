import { useMutation } from "@tanstack/react-query";
import api from "@/api";

import type {
  TelecommunicationAddress,
  TelecommunicationAddressData,
} from "api-ts";
import { TelecomForm } from "./TelecomForm";

interface Props {
  personId: string;
  telecom_address: TelecommunicationAddress;
  onCancel: () => void;
  onSuccess: () => void;
}

export const EditTelecomForm = ({
  personId,
  telecom_address,
  onCancel,
  onSuccess,
}: Props) => {
  const mutation = useMutation({
    mutationKey: [
      "person",
      personId,
      "telecommunication_addresses",
      telecom_address.id,
    ],
    mutationFn: (data: TelecommunicationAddressData) =>
      api.persons.updatePersonsPersonIdTelecommunicationAddressesAddressIdPatch(
        {
          personId,
          addressId: telecom_address.id,
          telecommunicationAddressData: data,
        }
      ),
    onSuccess,
  });

  return (
    <TelecomForm
      mutation={mutation}
      initialValues={telecom_address}
      onCancel={onCancel}
    />
  );
};
