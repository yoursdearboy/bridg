import { useMutation } from "@tanstack/react-query";
import api from "@/api";
import type { PostalAddress, PostalAddressData } from "api-ts";
import { AddressForm } from "./AddressForm";

interface Props {
  personId: string;
  address: PostalAddress;
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
    mutationFn: (data: PostalAddressData) =>
      api.persons.updatePersonsPersonIdPostalAddressesAddressIdPatch({
        personId,
        addressId: address.id,
        postalAddressData: data,
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
