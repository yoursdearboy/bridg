import { Box, FormControl, FormErrorMessage, FormLabel, Input, Select } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "@refinedev/react-hook-form";
import { useEffect } from "react";
import zod from "zod";
import { Edit } from "../../components/crud/edit";

const PersonSchema = zod.object({
  sex: zod.string(),
  birth_date: zod.string(),
  death_indicator: zod
    .preprocess(
      (x) => (x === "" ? null : x === "true" ? true : x === "false" ? false : x),
      zod.boolean().nullable()
    )
    .optional(),
  death_date: zod.preprocess((x) => (x === "" ? null : x), zod.string().nullable()).optional(),
  death_date_estimated_indicator: zod
    .preprocess(
      (x) => (x === "" ? null : x === "true" ? true : x === "false" ? false : x),
      zod.boolean().nullable()
    )
    .optional(),
});

type TPerson = zod.infer<typeof PersonSchema>;

export const PersonEdit = () => {
  const {
    refineCore: { formLoading, queryResult },
    saveButtonProps,
    register,
    resetField,
    formState: { errors },
    watch,
  } = useForm<TPerson>({
    resolver: zodResolver(PersonSchema),
  });

  const data = queryResult?.data;
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
      <Box bg="chakra-body-bg" borderRadius="md" px="4" py="3">
        <FormControl mb="3" isInvalid={!!errors?.sex}>
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
      </Box>
    </Edit>
  );
};
