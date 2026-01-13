import { useMutation } from "@tanstack/react-query";
import type {
  PersonTelecommunicationAddress,
  PersonTelecommunicationAddressData,
} from "api-ts";
import api from "@/api";
import { TelecommunicationAddressForm } from "./TelecommunicationAddressForm";

interface Props {
  personId: string;
  telecommunication_address: PersonTelecommunicationAddress;
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
    mutationFn: (data: PersonTelecommunicationAddressData) =>
      api.persons.updatePersonsPersonIdTelecommunicationAddressesAddressIdPatch(
        {
          personId,
          addressId: telecommunication_address.id,
          personTelecommunicationAddressData: data,
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
