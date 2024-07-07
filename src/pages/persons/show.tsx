import { BooleanField, DateField, TextField } from "@refinedev/chakra-ui";
import { useShow } from "@refinedev/core";

import { Box, Heading } from "@chakra-ui/react";
import { Show } from "../../components/crud/show";

export const PersonShow = () => {
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;
  const record = data?.data;

  return (
    <Show title={record?.primary_name?.full} isLoading={isLoading}>
      <Box bg="chakra-body-bg" borderRadius="md" px="4" py="3" maxW="sm">
        <Heading as="h5" size="sm">
          ID
        </Heading>
        <TextField value={record?.id} mt={2} />

        <Heading as="h5" size="sm" mt={4}>
          Sex
        </Heading>
        <TextField value={record?.sex} mt={2} />

        <Heading as="h5" size="sm" mt={4}>
          Birth date
        </Heading>
        <DateField value={record?.birth_date} mt={2} />

        <Heading as="h5" size="sm" mt={4}>
          Dead?
        </Heading>
        <BooleanField value={record?.death_indicator} trueIcon="Yes" falseIcon="No" mt={2} />

        {record?.death_indicator && (
          <>
            <Heading as="h5" size="sm" mt={4}>
              Death date
            </Heading>
            <DateField value={record?.death_date} mt={2} />
          </>
        )}

        {record?.death_indicator && (
          <>
            <Heading as="h5" size="sm" mt={4}>
              Death date estimated?
            </Heading>
            <BooleanField
              value={record?.death_date_estimated_indicator}
              trueIcon="Yes"
              falseIcon="No"
              mt={2}
            />
          </>
        )}
      </Box>
    </Show>
  );
};
