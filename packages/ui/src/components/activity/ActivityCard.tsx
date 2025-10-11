import { Box, Button, Card, Group, Menu, Text } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import api from "@/api";

interface StudyActivityMenuProps {
  spaceId: string;
}

const StudyActivityMenu = ({ spaceId }: StudyActivityMenuProps) => {
  const { data } = useQuery({
    queryKey: [spaceId, "activity"],
    queryFn: () => api.spaceActivity.indexSpacesSpaceIdActivityGet({ spaceId }),
  });

  const categories = [];
  if (data) {
    for (let i = 0; i < data.length; i++) {
      const currentCategory =
        data[i].usedDefinedActivity.categoryCode?.displayName;

      let categoryExists = false;
      for (let j = 0; j < categories.length; j++) {
        if (categories[j].name === currentCategory) {
          categoryExists = true;
          break;
        }
      }

      if (!categoryExists) {
        const allActivitiesInCategory = data.filter(
          (activity) =>
            activity.usedDefinedActivity.categoryCode?.displayName ===
            currentCategory
        );

        categories.push({
          name: currentCategory,
          activities: allActivitiesInCategory,
        });
      }
    }
  }

  return (
    <Menu width={300} position="bottom-start">
      <Menu.Target>
        <Button>Add Activity</Button>
      </Menu.Target>

      <Menu.Dropdown>
        {categories.map((category) => (
          <Menu.Sub key={category.name}>
            <Menu.Sub.Target>
              <Menu.Sub.Item>
                <Text>{category.name}</Text>
              </Menu.Sub.Item>
            </Menu.Sub.Target>

            <Menu.Sub.Dropdown>
              {category.activities.map((activity) => (
                <Menu.Item key={activity.id}>
                  <Text>
                    {activity.usedDefinedActivity.nameCode.displayName}
                  </Text>
                </Menu.Item>
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
  );
};
