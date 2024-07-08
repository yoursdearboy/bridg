import { BooleanField, DateField, TextField } from "@refinedev/chakra-ui";
import { BaseRecord, useShow } from "@refinedev/core";

import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Grid,
  GridItem,
  Heading,
  HStack,
  useDisclosure,
} from "@chakra-ui/react";
import { Show } from "../../components/crud/show";
import { NamesTable } from "../../components/persons/names/table";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";

type PersonBoxProps = {
  record: BaseRecord | undefined;
};

const PersonBox: React.FC<PersonBoxProps> = ({ record }) => {
  return (
    <Card bg="chakra-body-bg" borderRadius="md">
      <CardBody>
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
      </CardBody>
    </Card>
  );
};

const NamesBox = () => {
  const { isOpen, getDisclosureProps, getButtonProps } = useDisclosure();

  const buttonProps = getButtonProps();
  const disclosureProps = getDisclosureProps();

  return (
    <Card bg="chakra-body-bg" borderBottomRadius="md">
      <CardHeader px="4" py="3" {...buttonProps}>
        <HStack>
          <Heading size="md">Names</Heading>
          {isOpen ? <IconChevronUp /> : <IconChevronDown />}
        </HStack>
      </CardHeader>
      <CardBody {...disclosureProps}>
        <NamesTable />
      </CardBody>
    </Card>
  );
};

export const PersonShow = () => {
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;
  const record = data?.data;

  return (
    <Show title={record?.primary_name?.full} isLoading={isLoading}>
      <Grid gap={4}>
        <GridItem maxW="lg">
          <PersonBox record={record} />
        </GridItem>
        <GridItem maxW="lg">
          <NamesBox />
        </GridItem>
      </Grid>
    </Show>
  );
};
