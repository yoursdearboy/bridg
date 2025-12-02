import { Card, Group, Text } from "@mantine/core";
import type { ErrorComponentProps } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

export default function Error({ error }: ErrorComponentProps) {
  const { t } = useTranslation();
  return (
    <Card withBorder mih={200}>
      <Card.Section withBorder inheritPadding py="xs">
        <Group justify="space-between">
          <Text fw={500} c="red">
            {t("error")}
          </Text>
        </Group>
      </Card.Section>
      <Card.Section inheritPadding py="xs">
        <p>{t("errorContact")}</p>
        <div>{error.message}</div>
      </Card.Section>
    </Card>
  );
}
