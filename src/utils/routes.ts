import { type ReactNode } from 'react';

export interface AppRoute {
  path: string;
  element?: ReactNode;
  children?: AppRoute[];
  label?: string;
  icon?: ReactNode | string;
  hidden?: boolean;
  permissions?: string[];
}
