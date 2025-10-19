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
        subcategoryCode: null, // Нет подкатегории
        description: "Smth",
        id: "44444",
      },
    },
    {
      id: "5",
      usedDefinedActivity: {
        categoryCode: {
          code: null,
          id: "55",
          displayName: "Treatment",
        },
        nameCode: {
          code: null,
          id: "",
          displayName: "", // Нет категории
        },
        subcategoryCode: {
          code: null,
          id: "5555",
          displayName: "SubCat5",
        },
        description: "Smth",
        id: "55555",
      },
    },
    {
      id: "6",
      usedDefinedActivity: {
        categoryCode: null,
        nameCode: {
          code: null,
          id: "666",
          displayName: "Cat6",
        },
        subcategoryCode: {
          code: null,
          id: "6666",
          displayName: "SubCat6",
        },
        description: "Smth",
        id: "66666",
      },
    },
  ];
  const activities = [];

  for (let i = 0; i < data.length; i++) {
    const currentActivity =
      data[i].usedDefinedActivity.categoryCode?.displayName;
    const currentCategory = data[i].usedDefinedActivity.nameCode.displayName;
    const currentSubcategory =
      data[i].usedDefinedActivity.subcategoryCode?.displayName;

    if (!currentActivity && currentCategory) {
      let activityExists = false;
      let activityIndex = 0;

      for (let j = 0; j < activities.length; j++) {
        if (activities[j].name === currentCategory) {
          activityExists = true;
          activityIndex = j;
          break;
        }
      }

      if (!activityExists) {
        activities.push({
          name: currentCategory,
          categories: currentSubcategory
            ? [
                {
                  name: currentSubcategory,
                  subcategories: [],
                },
              ]
            : [],
        });
      }
      continue;
    }

    let activityExists = false;
    let activityIndex = 0;

    for (let j = 0; j < activities.length; j++) {
      if (activities[j].name === currentActivity) {
        activityExists = true;
        activityIndex = j;
        break;
      }
    }

    if (!activityExists) {
      if (!currentCategory && currentSubcategory) {
        activities.push({
          name: currentActivity,
          categories: [
            {
              name: currentSubcategory,
              subcategories: [],
            },
          ],
        });
      } else {
        activities.push({
          name: currentActivity,
          categories: [
            {
              name: currentCategory,
              subcategories: [currentSubcategory],
            },
          ],
        });
      }
    } else {
      if (!currentCategory && currentSubcategory) {
        let subcategoryAsCategoryExists = false;

        for (let k = 0; k < activities[activityIndex].categories.length; k++) {
          if (
            activities[activityIndex].categories[k].name === currentSubcategory
          ) {
            subcategoryAsCategoryExists = true;
            break;
          }
        }

        if (!subcategoryAsCategoryExists) {
          activities[activityIndex].categories.push({
            name: currentSubcategory,
            subcategories: [],
          });
        }
      } else {
        let categoryExists = false;
        let categoryIndex = 0;

        for (let k = 0; k < activities[activityIndex].categories.length; k++) {
          if (
            activities[activityIndex].categories[k].name === currentCategory
          ) {
            categoryExists = true;
            categoryIndex = k;
            break;
          }
        }

        if (!categoryExists) {
          activities[activityIndex].categories.push({
            name: currentCategory,
            subcategories: [currentSubcategory],
          });
        } else {
          let subcategoryExists = false;

          for (
            let l = 0;
            l <
            activities[activityIndex].categories[categoryIndex].subcategories
              .length;
            l++
          ) {
            if (
              activities[activityIndex].categories[categoryIndex].subcategories[
                l
              ] === currentSubcategory
            ) {
              subcategoryExists = true;
              break;
            }
          }

          if (!subcategoryExists && currentSubcategory) {
            activities[activityIndex].categories[
              categoryIndex
            ].subcategories.push(currentSubcategory);
          }
        }
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

            <Menu.Sub.Dropdown>
              {activity.categories.map((category) => (
                <Menu.Sub key={category.name}>
                  <Menu.Sub.Target>
                    <Menu.Sub.Item>
                      <Text>{category.name}</Text>
                    </Menu.Sub.Item>
                  </Menu.Sub.Target>

                  <Menu.Sub.Dropdown>
                    {category.subcategories.map((subcategory) => (
                      <Menu.Item key={subcategory}>
                        <Text>{subcategory}</Text>
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
