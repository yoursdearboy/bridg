import { FormControl, FormErrorMessage, FormLabel, Input, Select } from "@chakra-ui/react";
import { Edit } from "@refinedev/chakra-ui";
import { useForm } from "@refinedev/react-hook-form";
import { useEffect } from "react";

export const PersonEdit = () => {
  const {
    refineCore: { formLoading, queryResult },
    saveButtonProps,
    register,
    resetField,
    formState: { errors },
    watch,
  } = useForm();

  const { data } = queryResult;
  const record = data?.data;

  const isDead = String(watch("death_indicator", record?.death_indicator)) === "true";
  useEffect(() => {
    if (!isDead) {
      resetField("death_date");
      resetField("death_date_estimated_indicator");
    }
  });

  return (
    <Edit isLoading={formLoading} saveButtonProps={saveButtonProps}>
      <FormControl mb="3" isInvalid={!!errors?.name}>
        <FormLabel>Sex</FormLabel>
        <Select id="sex" {...register("sex")}>
          <option value="M">Male</option>
          <option value="F">Female</option>
          <option value="U">Unknown</option>
        </Select>
        <FormErrorMessage>{`${errors.sex?.message}`}</FormErrorMessage>
      </FormControl>

      <FormControl mb="3" isInvalid={!!errors?.birth_date}>
        <FormLabel>Birth date</FormLabel>
        <Input id="birth_date" type="text" {...register("birth_date")} />
        <FormErrorMessage>{`${errors.birth_date?.message}`}</FormErrorMessage>
      </FormControl>

      <FormControl mb="3" isInvalid={!!errors?.death_indicator}>
        <FormLabel>Dead?</FormLabel>
        <Select id="death_indicator" {...register("death_indicator")}>
          <option value=""></option>
          <option value="false">No</option>
          <option value="true">Yes</option>
        </Select>
        <FormErrorMessage>{`${errors.death_indicator?.message}`}</FormErrorMessage>
      </FormControl>

      {isDead && (
        <FormControl mb="3" isInvalid={!!errors?.death_date}>
          <FormLabel>Death date</FormLabel>
          <Input id="death_date" type="text" {...register("death_date")} />
          <FormErrorMessage>{`${errors.death_date?.message}`}</FormErrorMessage>
        </FormControl>
      )}

      {isDead && (
        <FormControl mb="3" isInvalid={!!errors?.death_date_estimated_indicator}>
          <FormLabel>Death date estimated?</FormLabel>
          <Select
            id="death_date_estimated_indicator"
            {...register("death_date_estimated_indicator")}
          >
            <option value=""></option>
            <option value="false">No</option>
            <option value="true">Yes</option>
          </Select>
          <FormErrorMessage>{`${errors.death_date_estimated_indicator?.message}`}</FormErrorMessage>
        </FormControl>
      )}
    </Edit>
  );
};
