import { Box, LoadingOverlay, Select } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import api from "@/api";

export const StudySiteSelect = ({
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
      api.indexSiteSpaceSpaceIdSiteGet({
        spaceId,
      }),
    queryKey: ["space", spaceId, "site"],
  });
  const options = (data || []).map((sspvr) => ({
    label: sspvr.executingStudySite.label || t("StudySite.defaultLabel"),
    value: sspvr.executingStudySite.id,
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
