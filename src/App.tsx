// Uncomment this line to use CSS modules
// import styles from './app.module.scss';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

import { createTheme, Loader, MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import AppRoutes from './routes';

const theme = createTheme({
  /** Put your mantine theme override here */
});

export function App() {
  return (
    <MantineProvider theme={theme}>
      <Loader />
      <Notifications />
      <AppRoutes />
    </MantineProvider>
  );
}

export default App;
