import { useMutation } from "@tanstack/react-query";
import type { PersonPostalAddress, PersonPostalAddressData } from "api-ts";
import api from "@/api";
import { AddressForm } from "./AddressForm";

interface Props {
  personId: string;
  address: PersonPostalAddress;
  onCancel: () => void;
  onSuccess: () => void;
}

export const EditAddressForm = ({
  personId,
  address,
  onCancel,
  onSuccess,
}: Props) => {
  const mutation = useMutation({
    mutationKey: ["person", personId, "addresses", address.id],
    mutationFn: (data: PersonPostalAddressData) =>
      api.persons.updatePersonsPersonIdPostalAddressesAddressIdPatch({
        personId,
        addressId: address.id,
        personPostalAddressData: data,
      }),
    onSuccess,
  });

  return (
    <AddressForm
      mutation={mutation}
      initialValues={address}
      onCancel={onCancel}
    />
  );
};
