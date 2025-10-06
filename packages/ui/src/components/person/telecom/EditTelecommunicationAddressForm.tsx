import { useMutation } from "@tanstack/react-query";
import type {
  TelecommunicationAddress,
  TelecommunicationAddressData,
} from "api-ts";
import api from "@/api";
import { TelecommunicationAddressForm } from "./TelecommunicationAddressForm";

interface Props {
  personId: string;
  telecommunication_address: TelecommunicationAddress;
  onCancel: () => void;
  onSuccess: () => void;
}

export const EditTelecommunicationAddressForm = ({
  personId,
  telecommunication_address,
  onCancel,
  onSuccess,
}: Props) => {
  const mutation = useMutation({
    mutationKey: [
      "person",
      personId,
      "telecommunication_addresses",
      telecommunication_address.id,
    ],
    mutationFn: (data: TelecommunicationAddressData) =>
      api.persons.updatePersonsPersonIdTelecommunicationAddressesAddressIdPatch(
        {
          personId,
          addressId: telecommunication_address.id,
          telecommunicationAddressData: data,
        }
      ),
    onSuccess,
  });

  return (
    <TelecommunicationAddressForm
      mutation={mutation}
      initialValues={telecommunication_address}
      onCancel={onCancel}
    />
  );
};
