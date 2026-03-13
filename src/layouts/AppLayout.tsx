import { AppShell } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Outlet } from 'react-router-dom';
import AppHeader from './AppHeader';
import AppSidebar from './AppSidebar';

export function AppLayout() {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppHeader opened={opened} toggle={toggle} />
      <AppSidebar />
      <AppShell.Main bg="gray.0" style={{ paddingTop: "30px" }}>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}

export default AppLayout;
