import { Badge } from "@mantine/core";
import { useTranslation } from "react-i18next";

export function AliveBadge({ deathDate }: { deathDate: Date | null }) {
  const { t } = useTranslation();

  if (deathDate) {
    return (
      <Badge size="xl" variant="outline" color="gray" radius="md">
        {t("PersonCard.deceased")}: {t("intlDate", { val: deathDate })}
      </Badge>
    );
  }

  return (
    <Badge size="xl" variant="light" color="green" radius="md">
      {t("PersonCard.notDeceased")}
    </Badge>
  );
}
