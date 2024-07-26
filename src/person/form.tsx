import { Checkbox, FormControl, FormLabel, Input, Select, VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import { Controller, useForm, useFormContext } from "react-hook-form";
import DateInput from "../components/date-input";

export const usePersonForm = ({ defaultValues = {} }: any = {}) => {
  defaultValues = {
    ...defaultValues,
    death_indicator:
      typeof defaultValues.death_indicator === "boolean"
        ? defaultValues.death_indicator.toString()
        : null,
  };
  return useForm({ defaultValues });
};

export default function PersonForm() {
  const { control, register, setValue, watch } = useFormContext();
  const isDead = watch("death_indicator") === "true";

  useEffect(() => {
    if (!isDead) {
      setValue("death_date", null);
      setValue("death_date_estimated_indicator", null);
    }
  }, [isDead]);

  return (
    <VStack align="stretch">
      <FormControl>
        <FormLabel>Administrative gender</FormLabel>
        <Select {...register("administrative_gender")} w="250px">
          <option></option>
          <option value="M">Male</option>
          <option value="F">Female</option>
          <option value="U">Unknown</option>
        </Select>
      </FormControl>

      <FormControl>
        <FormLabel>Birth date</FormLabel>
        <Controller
          control={control}
          name="birth_date"
          render={({ field }) => (
            <DateInput
              locale="ru"
              value={field.value}
              onChange={(x) => field.onChange(x === "" ? null : x)}
            />
          )}
        />
      </FormControl>

      <FormControl>
        <FormLabel>Death</FormLabel>
        <Select
          {...register("death_indicator", {
            setValueAs: (x) => (x === "" ? null : x),
          })}
          w="250px"
        >
          <option></option>
          <option value="false">Alive</option>
          <option value="true">Dead</option>
        </Select>
      </FormControl>

      <FormControl display={isDead ? "block" : "none"}>
        <FormLabel>Death date</FormLabel>
        <Controller
          control={control}
          name="death_date"
          render={({ field }) => (
            <DateInput
              locale="ru"
              value={field.value}
              onChange={(x) => field.onChange(x === "" ? null : x)}
            />
          )}
        />
      </FormControl>

      <FormControl display={isDead ? "block" : "none"}>
        <FormLabel />
        <Checkbox {...register("death_date_estimated_indicator")}>Estimated, not exact</Checkbox>
      </FormControl>
    </VStack>
  );
}
