import { useMutation } from "@tanstack/react-query";
import { type PostalAddressData } from "api-ts";
import api from "@/api";
import { AddressForm } from "./AddressForm";

interface Props {
  personId: string;
  onCancel: () => void;
  onSuccess: () => void;
}

export const NewAddressForm = ({ personId, onCancel, onSuccess }: Props) => {
  const mutation = useMutation({
    mutationKey: ["person", personId, "addresses"],
    mutationFn: (data: PostalAddressData) =>
      api.persons.createPersonsPersonIdPostalAddressesPost({
        personId,
        postalAddressData: data,
      }),
    onSuccess,
  });

  return (
    <AddressForm onCancel={onCancel} initialValues={{}} mutation={mutation} />
  );
};
