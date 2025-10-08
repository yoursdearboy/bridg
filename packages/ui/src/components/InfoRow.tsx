import { Box, Group } from "@mantine/core";

interface InfoRowProps {
  label: string;
  value?: React.ReactNode;
  children?: React.ReactNode;
}

export const InfoRow = ({ label, value, children }: InfoRowProps) => {
  return (
    <Group align="flex-start">
      <Box fw={600} w={150} c="dimmed">
        {label}:
      </Box>
      <Box>
        {value || "-"}
        {children}
      </Box>
    </Group>
  );
};
