import { Group, Text } from "@mantine/core";

interface InfoRowProps {
  label: string;
  value?: React.ReactNode;
  children?: React.ReactNode;
}

export const InfoRow = ({ label, value, children }: InfoRowProps) => {
  return (
    <Group align="flex-start">
      <Text fw={600} w={150} c="dimmed">
        {label}:
      </Text>
      <Text>
        {value || "-"}
        {children}
      </Text>
    </Group>
  );
};
