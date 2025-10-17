import { Box, Button, Card, Group, Menu, Text } from "@mantine/core";
import type { StudyActivity } from "api-ts";

interface StudyActivityMenuProps {
  spaceId: string;
}

const StudyActivityMenu = ({ spaceId }: StudyActivityMenuProps) => {
  const data: StudyActivity[] = [
    {
      id: "1",
      usedDefinedActivity: {
        categoryCode: {
          code: null,
          id: "11",
          displayName: "Lab",
        },
        nameCode: {
          code: null,
          id: "111",
          displayName: "Cat1",
        },
        subcategoryCode: {
          code: null,
          id: "1111",
          displayName: "SubCat1",
        },
        description: "Smth",
        id: "11111",
      },
    },
    {
      id: "2",
      usedDefinedActivity: {
        categoryCode: {
          code: null,
          id: "22",
          displayName: "Lab",
        },
        nameCode: {
          code: null,
          id: "222",
          displayName: "Cat2",
        },
        subcategoryCode: {
          code: null,
          id: "2222",
          displayName: "SubCat2",
        },
        description: "Smth",
        id: "22222",
      },
    },
    {
      id: "3",
      usedDefinedActivity: {
        categoryCode: {
          code: null,
          id: "33",
          displayName: "Treatment",
        },
        nameCode: {
          code: null,
          id: "333",
          displayName: "Cat3",
        },
        subcategoryCode: {
          code: null,
          id: "3333",
          displayName: "SubCat3",
        },
        description: "Smth",
        id: "33333",
      },
    },
    {
      id: "4",
      usedDefinedActivity: {
        categoryCode: {
          code: null,
          id: "44",
          displayName: "Treatment",
        },
        nameCode: {
          code: null,
          id: "444",
          displayName: "Cat4",
        },
        subcategoryCode: {
          code: null,
          id: "4444",
          displayName: "SubCat4",
        },
        description: "Smth",
        id: "44444",
      },
    },
  ];

  const activities = [];

  for (let i = 0; i < data.length; i++) {
    const currentActivity =
      data[i].usedDefinedActivity.categoryCode?.displayName;
    const currentCategory = data[i].usedDefinedActivity.nameCode.displayName;

    if (!currentActivity) continue;

    let activityExists = false;
    let activityIndex = -1;

    for (let j = 0; j < activities.length; j++) {
      if (activities[j].name === currentActivity) {
        activityExists = true;
        activityIndex = j;
        break;
      }
    }

    if (!activityExists) {
      activities.push({
        name: currentActivity,
        categories: [currentCategory],
      });
    } else {
      let categoryExists = false;

      for (let k = 0; k < activities[activityIndex].categories.length; k++) {
        if (activities[activityIndex].categories[k] === currentCategory) {
          categoryExists = true;
          break;
        }
      }

      if (!categoryExists) {
        activities[activityIndex].categories.push(currentCategory);
      }
    }
  }

  console.log(activities);

  return (
    <Menu width={300} position="bottom-start">
      <Menu.Target>
        <Button>Add Activity</Button>
      </Menu.Target>

      <Menu.Dropdown>
        {activities.map((activity) => (
          <Menu.Sub key={activity.name}>
            <Menu.Sub.Target>
              <Menu.Sub.Item>
                <Text>{activity.name}</Text>
              </Menu.Sub.Item>
            </Menu.Sub.Target>

            <Menu.Dropdown>
              {activity.categories.map((category) => (
                <Menu.Item key={category}>
                  <Text>{category}</Text>
                </Menu.Item>
              ))}
            </Menu.Dropdown>
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
