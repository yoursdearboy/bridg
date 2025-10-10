import { Button, Menu, Text } from "@mantine/core";
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

const activitiesToNode = (sas: StudyActivity[]) => {
  const root: Node = {
    key: "root",
    label: "root",
    children: [],
  };

  sas.forEach((sa: StudyActivity) => {
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
  });

  return root;
};

const ActivityMenuNode = ({ node }: { node: Node }) =>
  node.children.map((child) =>
    child.children.length ? (
      <Menu.Sub>
        <Menu.Sub.Target>
          <Menu.Sub.Item>{child.label}</Menu.Sub.Item>
        </Menu.Sub.Target>
        <Menu.Sub.Dropdown>
          <ActivityMenuNode node={child} />
        </Menu.Sub.Dropdown>
      </Menu.Sub>
    ) : (
      <Menu.Item>{child.label}</Menu.Item>
    )
  );

const ActivityMenuError = ({ error }: { error: Error }) => {
  const { t } = useTranslation();
  return (
    <Menu.Item
      onClick={() => alert(t("errorMessage", { error: error.message }))}
    >
      <Text c="red">{t("error")}</Text>
    </Menu.Item>
  );
};

interface ActivityMenuProps {
  spaceId: string;
}

export const ActivityMenu = ({ spaceId }: ActivityMenuProps) => {
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
        {isError && <ActivityMenuError error={error} />}
        {isSuccess && <ActivityMenuNode node={activitiesToNode(data)} />}
      </Menu.Dropdown>
    </Menu>
  );
};
