import { AppShell, Burger, Group, Title } from '@mantine/core';

interface AppHeaderProps {
  opened: boolean;
  toggle: () => void;
}

export function AppHeader({ opened, toggle }: AppHeaderProps) {
  return (
    <AppShell.Header>
      <Group h="100%" px="md">
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        <Title order={3}>My Insurance</Title>
      </Group>
    </AppShell.Header>
  );
}

export default AppHeader;
