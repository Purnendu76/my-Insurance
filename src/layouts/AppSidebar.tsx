import { AppShell, NavLink } from '@mantine/core';
import { useLocation, useNavigate } from 'react-router-dom';
import { appRoutesConfig } from '../routes/routesConfig';
import type { AppRoute } from '../utils/routes';

export function AppSidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const renderNavItems = (routes: AppRoute[], parentPath = '') => {
    return routes.map((route) => {
      if (route.hidden) return null;

      // Ensure proper path construction without double slashes
      const fullPath = [parentPath, route.path].filter(Boolean).join('/').replace(/\/\/+/g, '/');
      const navPath = fullPath.startsWith('/') ? fullPath : `/${fullPath}`;

      // Calculate active state
      let isActive = false;
      if (route.path === '') {
        isActive = location.pathname === (parentPath || '/');
      } else {
        isActive = location.pathname.startsWith(navPath);
      }

      if (route.children && route.children.length > 0) {
        return (
          <NavLink
            key={route.label || fullPath}
            label={route.label}
            leftSection={route.icon}
            childrenOffset={28}
            defaultOpened={isActive}
            style={{ borderRadius: '8px', marginBottom: '4px' }}
          >
            {renderNavItems(route.children, navPath)}
          </NavLink>
        );
      }

      return (
        <NavLink
          key={route.label || navPath}
          label={route.label}
          leftSection={route.icon}
          active={isActive}
          onClick={() => navigate(navPath)}
          variant="filled"
          style={{ borderRadius: '8px', marginBottom: '4px' }}
        />
      );
    });
  };

  return (
    <AppShell.Navbar p="md">
      {appRoutesConfig.children && renderNavItems(appRoutesConfig.children, appRoutesConfig.path)}
    </AppShell.Navbar>
  );
}

export default AppSidebar;
