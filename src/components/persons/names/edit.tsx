import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

import type { UseModalFormReturnType } from "@refinedev/react-hook-form";
import { Edit } from "../../crud/edit";

export const EditPersonName: React.FC<UseModalFormReturnType> = ({
  saveButtonProps,
  modal: { visible, close },
  register,
  formState: { errors },
  refineCore: { id },
}) => {
  return (
    <Modal size="2xl" isOpen={visible} onClose={close}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalHeader>Edit Name</ModalHeader>
        <ModalBody>
          <Edit
            recordItemId={id}
            breadcrumb={false}
            title={false}
            goBack={null}
            saveButtonProps={saveButtonProps}
          >
            <FormControl mb="3" isInvalid={!!errors?.use}>
              <FormLabel>Use</FormLabel>
              <Input id="use" type="text" {...register("use")} />
              <FormErrorMessage>{`${errors.use?.message}`}</FormErrorMessage>
            </FormControl>

            <FormControl mb="3" isInvalid={!!errors?.family}>
              <FormLabel>Family</FormLabel>
              <Input id="family" type="text" {...register("family")} />
              <FormErrorMessage>{`${errors.family?.message}`}</FormErrorMessage>
            </FormControl>

            <FormControl mb="3" isInvalid={!!errors?.given}>
              <FormLabel>Given</FormLabel>
              <Input id="given" type="text" {...register("given")} />
              <FormErrorMessage>{`${errors.given?.message}`}</FormErrorMessage>
            </FormControl>

            <FormControl mb="3" isInvalid={!!errors?.middle}>
              <FormLabel>Middle</FormLabel>
              <Input id="middle" type="text" {...register("middle")} />
              <FormErrorMessage>{`${errors.middle?.message}`}</FormErrorMessage>
            </FormControl>

            <FormControl mb="3" isInvalid={!!errors?.patronymic}>
              <FormLabel>Patronymic</FormLabel>
              <Input id="patronymic" type="text" {...register("patronymic")} />
              <FormErrorMessage>{`${errors.patronymic?.message}`}</FormErrorMessage>
            </FormControl>

            <FormControl mb="3" isInvalid={!!errors?.prefix}>
              <FormLabel>Prefix</FormLabel>
              <Input id="prefix" type="text" {...register("prefix")} />
              <FormErrorMessage>{`${errors.prefix?.message}`}</FormErrorMessage>
            </FormControl>

            <FormControl mb="3" isInvalid={!!errors?.suffix}>
              <FormLabel>Suffix</FormLabel>
              <Input id="suffix" type="text" {...register("suffix")} />
              <FormErrorMessage>{`${errors.suffix?.message}`}</FormErrorMessage>
            </FormControl>
          </Edit>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
