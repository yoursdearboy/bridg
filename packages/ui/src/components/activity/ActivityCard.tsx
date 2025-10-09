import { Box, Button, Card, Group, Menu, Text } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import type { Code, StudyActivity } from "api-ts";
import { useTranslation } from "react-i18next";
import api from "@/api";

interface Node {
  key: string;
  label: string;
  children: Node[];
}

const codeToNode = (code: Code): Node => ({
  key: code.code || "",
  label: code.displayName || "Unnamed",
  children: [],
});

const addActivityToNode = (root: Node, sa: StudyActivity) => {
  const { nameCode, categoryCode, subcategoryCode } = sa.usedDefinedActivity;

  let pointer = root;
  let node: Node | undefined;

  if (categoryCode) {
    const categoryNode = codeToNode(categoryCode);
    node = pointer.children.find((e) => e.key == categoryNode.key);
    if (!node) {
      node = categoryNode;
      pointer.children.push(node);
    }
    pointer = node;
  }

  if (subcategoryCode) {
    const subcategoryNode = codeToNode(subcategoryCode);
    node = pointer.children.find((e) => e.key == subcategoryNode.key);
    if (!node) {
      node = subcategoryNode;
      pointer.children.push(node);
    }
    pointer = subcategoryNode;
  }

  const activityNode = codeToNode(nameCode);
  pointer.children.push(activityNode);
};

const activitiesToNode = (sas: StudyActivity[]) => {
  const root: Node = {
    key: "root",
    label: "root",
    children: [],
  };

  sas.forEach((a) => addActivityToNode(root, a));

  return root;
};

const StudyActivitySubMenu = ({ node }: { node: Node }) =>
  node.children.map((child) =>
    child.children.length ? (
      <Menu.Sub>
        <Menu.Sub.Target>
          <Menu.Sub.Item>{child.label}</Menu.Sub.Item>
        </Menu.Sub.Target>
        <Menu.Sub.Dropdown>
          <StudyActivitySubMenu node={child} />
        </Menu.Sub.Dropdown>
      </Menu.Sub>
    ) : (
      <Menu.Item>{child.label}</Menu.Item>
    )
  );

const MenuError = ({ error }: { error: Error }) => {
  const { t } = useTranslation();
  return (
    <Menu.Item
      onClick={() => alert(t("errorMessage", { error: error.message }))}
    >
      <Text c="red">{t("error")}</Text>
    </Menu.Item>
  );
};

interface StudyActivityMenuProps {
  spaceId: string;
}

const StudyActivityMenu = ({ spaceId }: StudyActivityMenuProps) => {
  const { t } = useTranslation();
  const { data, isSuccess, isError, error } = useQuery({
    queryKey: [spaceId, "activity"],
    queryFn: () => api.spaceActivity.indexSpacesSpaceIdActivityGet({ spaceId }),
  });
  return (
    <Menu>
      <Menu.Target>
        <Button variant="outline" size="compact-sm" fw={500}>
          {t("add")}
        </Button>
      </Menu.Target>
      <Menu.Dropdown>
        {isError && <MenuError error={error} />}
        {isSuccess && <StudyActivitySubMenu node={activitiesToNode(data)} />}
      </Menu.Dropdown>
    </Menu>
  );
};

interface ActivityCardProps {
  spaceId: string;
}

export const ActivityCard = ({ spaceId }: ActivityCardProps) => {
  return (
    <>
      <Card withBorder shadow="sm" radius="md">
        <Card.Section withBorder inheritPadding py="xs">
          <Group justify="space-between">
            <Text fw={500} px="xs">
              Activity
            </Text>
            <StudyActivityMenu spaceId={spaceId} />
          </Group>
        </Card.Section>
        <Card.Section inheritPadding py="xs">
          <Box pos="relative" style={{ minHeight: 80 }}></Box>
        </Card.Section>
      </Card>
    </>
  );
};
