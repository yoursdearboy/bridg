import { Box, Button, Card, Group, Menu, Text } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import type { StudyActivity } from "api-ts";
import { defaultTo, groupBy, map, pipe, toPairs } from "ramda";
import { useTranslation } from "react-i18next";
import api from "@/api";

interface StudyActivityMenuProps {
  spaceId: string;
}

// const groupBy = <T, K extends PropertyKey>(arr: T[], key: (i: T) => K) =>
//   arr.reduce(
//     (groups, item) => {
//       // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
//       (groups[key(item)] ||= []).push(item);
//       return groups;
//     },
//     {} as Record<K, T[]>
//   );

const groupByCategory = pipe(
  groupBy(
    (sa: StudyActivity) =>
      sa.usedDefinedActivity.categoryCode?.displayName || ""
  ),
  toPairs
) as (list: readonly StudyActivity[]) => [string, StudyActivity[]][];

const groupBySubcategory = pipe(
  groupBy(
    (sa: StudyActivity) =>
      sa.usedDefinedActivity.subcategoryCode?.displayName || ""
  ),
  toPairs
) as (list: readonly StudyActivity[]) => [string, StudyActivity[]][];

const groupActivities = pipe(groupByCategory, map(groupBySubcategory));

const StudyActivityMenu = ({ spaceId }: StudyActivityMenuProps) => {
  const { t } = useTranslation();
  const { data, isError, error } = useQuery({
    queryKey: [spaceId, "activity"],
    queryFn: () => api.spaceActivity.indexSpacesSpaceIdActivityGet({ spaceId }),
  });
  const tree = groupActivities(data || []);

  return (
    <Menu>
      <Menu.Target>
        <Button variant="outline" size="compact-sm" fw={500}>
          {t("add")}
        </Button>
      </Menu.Target>
      <Menu.Dropdown>
        {isError && (
          <Menu.Item
            onClick={() => alert(t("errorMessage", { error: error.message }))}
          >
            <Text c="red">{t("error")}</Text>
          </Menu.Item>
        )}
        {tree.map(([key1, level1]) => (
          <Menu.Sub>
            <Menu.Sub.Target>
              <Menu.Sub.Item>{key1}</Menu.Sub.Item>
            </Menu.Sub.Target>
            <Menu.Sub.Dropdown>
              {level1.map(([key2, level2]) => (
                <Menu.Sub>
                  <Menu.Sub.Target>
                    <Menu.Sub.Item>{key2}</Menu.Sub.Item>
                  </Menu.Sub.Target>
                  <Menu.Sub.Dropdown>
                    {level2.map((level3) => (
                      <Menu.Item>
                        {level3.usedDefinedActivity.nameCode.displayName}
                      </Menu.Item>
                    ))}
                  </Menu.Sub.Dropdown>
                </Menu.Sub>
              ))}
            </Menu.Sub.Dropdown>
          </Menu.Sub>
        ))}
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
