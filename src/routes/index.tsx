import { Route, Routes } from 'react-router-dom';
import { appRoutesConfig } from './routesConfig';
import type { AppRoute } from '../utils/routes';

export function AppRoutes() {
  const renderRoutes = (routes: AppRoute[]) => {
    return routes.map((route, index) => {
      // If no path is provided and there are children, it acts as a layout/wrapper
      // If path is empty string it acts as an index route

      if (route.children && route.children.length > 0) {
        return (
          <Route key={index} path={route.path || undefined} element={route.element}>
            {renderRoutes(route.children)}
          </Route>
        );
      }

      return (
        <Route
          key={index}
          index={route.path === ''}
          path={route.path !== '' ? route.path : undefined}
          element={route.element}
        />
      );
    });
  };

  return (
    <Routes>
      <Route path={appRoutesConfig.path} element={appRoutesConfig.element}>
        {appRoutesConfig.children && renderRoutes(appRoutesConfig.children)}
      </Route>
    </Routes>
  );
}

export default AppRoutes;
