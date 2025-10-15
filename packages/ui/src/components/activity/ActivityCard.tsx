import { Box, Button, Card, Group, Menu, Text } from "@mantine/core";
// import { useQuery } from "@tanstack/react-query";
// import api from "@/api";

interface StudyActivityMenuProps {
  spaceId: string;
}
//я правильно поняла, что прсто тестовый массив нужен?потом надо будет данные из апишки?

const StudyActivityMenu = ({ spaceId }: StudyActivityMenuProps) => {
  const activities = [
    {
      id: "1",
      usedDefinedActivity: {
        categoryCode: {
          displayName: "Lab",
        },
        nameCode: {
          displayName: "Cat1",
        },
        subcategoryCode: {
          displayName: "SubCat1",
        },
        description: "Smth",
      },
    },
    {
      id: "2",
      usedDefinedActivity: {
        categoryCode: {
          displayName: "Lab",
        },
        nameCode: {
          displayName: "Cat2",
        },
        subcategoryCode: {
          displayName: "SubCat2",
        },
        description: "Smth2",
      },
    },

    {
      id: "3",
      usedDefinedActivity: {
        categoryCode: {
          displayName: "Activity2",
        },
        nameCode: {
          displayName: "Cat3",
        },
        subcategoryCode: {
          displayName: "SubCat3",
        },
        description: "Smth3",
      },
    },

    {
      id: "4",
      usedDefinedActivity: {
        categoryCode: null,
        nameCode: {
          displayName: "Cat4",
        },
        subcategoryCode: null,
        description: "Smth4",
      },
    },
  ];
  const data = activities;
  const categories = [];

  for (let i = 0; i < data.length; i++) {
    const currentCategory =
      data[i].usedDefinedActivity.categoryCode?.displayName || "other";
    const currentSubCategory =
      data[i].usedDefinedActivity.subcategoryCode?.displayName || "other";
    let categoryExists = false;
    for (let j = 0; j < categories.length; j++) {
      if (categories[j].name === currentCategory) {
        categoryExists = true;

        let subcategoryExists = false;
        for (let k = 0; k < categories[j].subcategories.length; k++) {
          if (categories[j].subcategories[k].name === currentSubCategory) {
            subcategoryExists = true;

            categories[j].subcategories[k].activities.push(data[i]);
            break;
          }
        }

        if (!subcategoryExists) {
          categories[j].subcategories.push({
            name: currentSubCategory,
            activities: [data[i]],
          });
        }
        break;
      }
    }

    if (!categoryExists) {
      categories.push({
        name: currentCategory,
        subcategories: [
          {
            name: currentSubCategory,
            activities: [data[i]],
          },
        ],
      });
    }
  }

  return (
    <Menu width={350} position="bottom-start">
      <Menu.Target>
        <Button>Add Activity</Button>
      </Menu.Target>

      <Menu.Dropdown>
        {categories.map((category) => (
          <Menu.Sub key={category.name}>
            <Menu.Sub.Target>
              <Menu.Sub.Item>
                <Text fw={500}>{category.name}</Text>
              </Menu.Sub.Item>
            </Menu.Sub.Target>

            <Menu.Sub.Dropdown>
              {category.subcategories.map((subcategory) => (
                <Menu.Sub key={subcategory.name}>
                  <Menu.Sub.Target>
                    <Menu.Sub.Item>
                      <Text>{subcategory.name}</Text>
                    </Menu.Sub.Item>
                  </Menu.Sub.Target>

                  <Menu.Sub.Dropdown>
                    {subcategory.activities.map((activity) => (
                      <Menu.Item key={activity.id}>
                        <Text>
                          {activity.usedDefinedActivity.nameCode.displayName}
                        </Text>
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
