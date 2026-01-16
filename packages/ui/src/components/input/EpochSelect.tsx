import { Box, LoadingOverlay, Select } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import api from "@/api";

export const EpochSelect = ({
  label,
  value,
  spaceId,
  onChange,
}: {
  label: string | null;
  value: string | null;
  spaceId: string;
  onChange: (value: string | null) => void;
}) => {
  const { t } = useTranslation();
  const { data, isLoading } = useQuery({
    queryFn: () =>
      api.listSpaceEpoch({
        spaceId,
      }),
    queryKey: ["space", spaceId, "epoch"],
  });
  const options = (data || []).map((epoch) => ({
    label: epoch.name || t("Epoch.defaultName"),
    value: epoch.id,
  }));
  return (
    <Box pos="relative">
      <LoadingOverlay
        visible={isLoading}
        loaderProps={{ size: 16, type: "dots" }}
      />
      <Select
        label={label}
        data={options}
        clearable
        defaultValue={value || null}
        onChange={onChange}
      />
    </Box>
  );
};
