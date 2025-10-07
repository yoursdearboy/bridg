import {
  Box,
  Button,
  Card,
  Group,
  LoadingOverlay,
  Menu,
  Modal,
  Text,
} from "@mantine/core";
import { IconPhone, IconMail, IconWorldWww } from "@tabler/icons-react";
import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { URLScheme, type TelecommunicationAddress } from "api-ts";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import api from "@/api";
import { NewTelecommunicationAddressForm } from "./NewTelecommunicationAddressForm";
import { TelecommunicationAddressTable } from "./TelecommunicationAddressTable";

export const TelecommunicationAddressCardWrapper = ({
  personId,
}: {
  personId: string;
}) => {
  const query = useQuery({
    queryKey: ["person", personId, "telecommunication_addresses"],
    queryFn: () =>
      api.persons.indexPersonsPersonIdTelecommunicationAddressesGet({
        personId,
      }),
  });

  return <TelecommunicationAddressCard personId={personId} query={query} />;
};

interface TelecommunicationAddressCardProps {
  personId: string;
  query: UseQueryResult<TelecommunicationAddress[], Error>;
}

export const TelecommunicationAddressCard = ({
  personId,
  query,
}: TelecommunicationAddressCardProps) => {
  const [selectedScheme, setSelectedScheme] = useState<URLScheme | null>(null);
  const { t } = useTranslation();
  const {
    isPending,
    isError,
    error,
    data: telecommunication_addresses,
  } = query;

  const closeForm = () => {
    setSelectedScheme(null);
  };
  const schemeIcons = {
    tel: (
      <IconPhone
        style={{ marginRight: "6px", marginBottom: "-3px" }}
        size={16}
        strokeWidth={2}
        color={"white"}
      />
    ),
    mailto: (
      <IconMail
        size={16}
        style={{ marginRight: "6px", marginBottom: "-3px" }}
        strokeWidth={2}
        color={"white"}
      />
    ),
    ftp: (
      <IconWorldWww
        size={16}
        style={{ marginRight: "6px", marginBottom: "-3px" }}
        strokeWidth={2}
        color={"white"}
      />
    ),
    http: (
      <IconWorldWww
        size={16}
        style={{ marginRight: "6px", marginBottom: "-3px" }}
        strokeWidth={2}
        color={"white"}
      />
    ),
  };
  return (
    <>
      <Card withBorder shadow="sm" radius="md">
        <Card.Section withBorder inheritPadding py="xs">
          <Group justify="space-between">
            <Text fw={500} px="xs">
              {t("TelecommunicationAddressesTable.title")}
            </Text>
            <Menu>
              <Menu.Target>
                <Button variant="outline" size="compact-sm">
                  {t("add")}
                </Button>
              </Menu.Target>

              <Menu.Dropdown>
                {Object.values(URLScheme).map((scheme) => (
                  <Menu.Item
                    key={scheme}
                    onClick={() => setSelectedScheme(scheme)}
                  >
                    <div>
                      {schemeIcons[scheme]}
                      {t(`TelecommunicationAddressScheme.${scheme}`)}
                    </div>
                  </Menu.Item>
                ))}
              </Menu.Dropdown>
            </Menu>
          </Group>
        </Card.Section>
        <Card.Section inheritPadding py="xs">
          <Box pos="relative" style={{ minHeight: 80 }}>
            <LoadingOverlay visible={isPending} />
            {isError && (
              <Text color="red">
                {t("errorMessage", { error: error.message })}
              </Text>
            )}
            {!isPending && !isError && (
              <TelecommunicationAddressTable
                personId={personId}
                telecom_addresses={telecommunication_addresses}
              />
            )}
          </Box>
        </Card.Section>
      </Card>
      <Modal
        opened={selectedScheme != null}
        onClose={closeForm}
        title={`${t("add")}`}
        size="lg"
      >
        <NewTelecommunicationAddressForm
          personId={personId}
          onCancel={closeForm}
          onSuccess={closeForm}
          initialValues={{ scheme: selectedScheme }}
        />
      </Modal>
    </>
  );
};
