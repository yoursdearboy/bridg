import { FormControl, FormLabel, HStack, Input, Select, VStack } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";

export default function NameForm() {
  const { register } = useFormContext();

  return (
    <VStack align="stretch">
      <HStack>
        <FormControl w="auto">
          <FormLabel>Family</FormLabel>
          <Input {...register("family")} />
        </FormControl>
        <FormControl w="auto">
          <FormLabel>Middle</FormLabel>
          <Input {...register("middle")} />
        </FormControl>
        <FormControl w="auto">
          <FormLabel>Given</FormLabel>
          <Input {...register("given")} />
        </FormControl>
      </HStack>

      <details>
        <summary>Extra</summary>
        <VStack align="stretch" my="2">
          <HStack>
            <FormControl w="auto" maxW="100px">
              <FormLabel>Prefix</FormLabel>
              <Input {...register("prefix")} />
            </FormControl>

            <FormControl w="auto" maxW="100px">
              <FormLabel>Suffix</FormLabel>
              <Input {...register("suffix")} />
            </FormControl>
          </HStack>

          <HStack>
            <FormControl w="auto">
              <FormLabel>Patronymic</FormLabel>
              <Input {...register("patronymic")} />
            </FormControl>
          </HStack>

          <HStack>
            <FormControl w="auto">
              <FormLabel>Use</FormLabel>
              <Select
                {...register("use", {
                  setValueAs: (x) => (x === "" ? null : x),
                })}
              >
                <option value=""></option>
                <option value="official">official</option>
                <option value="nickname">nickname</option>
              </Select>
            </FormControl>
          </HStack>
        </VStack>
      </details>
    </VStack>
  );
}
