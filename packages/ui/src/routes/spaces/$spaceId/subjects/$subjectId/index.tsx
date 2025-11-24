import { Button, Grid, Group, Menu, Modal, Stack, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconArrowRight, IconCaretDown } from "@tabler/icons-react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { ActivityCard } from "@/components/activity/ActivityCard";
import ButtonLink from "@/components/ButtonLink";
import { PersonCard } from "@/components/person/PersonCard";
import { SpaceRedirectForm } from "@/components/subject/SpaceRedirectForm";
import { StatusCard } from "@/components/subject/StatusCard";

export const Route = createFileRoute("/spaces/$spaceId/subjects/$subjectId/")({
  component: SubjectShowPage,
  beforeLoad: () => ({
    breadcrumb: null,
  }),
});

function SubjectShowPage() {
  const { query } = Route.useRouteContext();
  const { data: subject } = useSuspenseQuery(query);
  const { spaceId, subjectId } = Route.useParams();
  const { t } = useTranslation();
  const [redirectModalOpened, redirectModalHandlers] = useDisclosure(false);

  return (
    <Stack gap="md">
      <Group justify="space-between">
        <Group>
          <Title order={2} fw={500}>
            {subject.performingBiologicEntity?.primaryName?.label ||
              t("StudySubject.defaultLabel")}
          </Title>
          <StatusCard
            spaceId={spaceId}
            subjectId={subjectId}
            subject={subject}
          />
        </Group>

        <Button.Group>
          <ButtonLink to=".." size="sm">
            {t("SubjectShowPage.back")}
          </ButtonLink>
          <Menu shadow="md" width={200}>
            <Menu.Target>
              <Button size="sm" p="xs">
                <IconCaretDown />
              </Button>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item
                onClick={redirectModalHandlers.open}
                leftSection={<IconArrowRight />}
              >
                {t("SubjectShowPage.redirect")}
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Button.Group>
      </Group>

      <Grid>
        <Grid.Col span={{ base: 12, md: 6 }}>
          {subject.performingBiologicEntity && (
            <PersonCard
              person={subject.performingBiologicEntity}
              link="forward"
            />
          )}
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <ActivityCard spaceId={spaceId} subjectId={subjectId} />
        </Grid.Col>
      </Grid>

      <Modal
        opened={redirectModalOpened}
        onClose={redirectModalHandlers.close}
        title={t("SubjectShowPage.redirectModalTitle")}
        size="lg"
      >
        <SpaceRedirectForm
          subject={subject}
          onCancel={redirectModalHandlers.close}
          onSuccess={redirectModalHandlers.close}
        />
      </Modal>
    </Stack>
  );
}
