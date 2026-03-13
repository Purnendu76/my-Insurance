import { lazy, Suspense } from 'react';
import { IconDashboard, IconListCheck, IconCar, IconHeartbeat, IconPlane, IconBuilding, IconUser, IconDots, IconCalculator, IconReceiptTax, IconFileCertificate, IconReportMoney, IconRefresh, IconBriefcase,  } from '@tabler/icons-react';
import type { AppRoute } from '../utils/routes';
import AppLayout from '../layouts/AppLayout';
import { SuspenseLoader } from '../components/loaders/SuspenseLoader';


// Lazy loaded pages
const Dashboard = lazy(() => import('../pages/Dashboard'));
const Task = lazy(() => import('../pages/Task'));
const GSTRegistration = lazy(() => import('../pages/GST-Registration').then(module => ({ default: module.GSTRegistration })));
const ETDS = lazy(() => import('../pages/e-TDS').then(module => ({ default: module.ETDSPage })));
const ITRFiling = lazy(() => import('../pages/ITRFiling'));

// My Policies pages
const Motor = lazy(() => import('../pages/My Polices/Motor').then(module => ({ default: module.Motor })));
const Health = lazy(() => import('../pages/My Polices/Health').then(module => ({ default: module.Health })));
const Life = lazy(() => import('../pages/My Polices/Life').then(module => ({ default: module.Life })));
const Travel = lazy(() => import('../pages/My Polices/Travel').then(module => ({ default: module.Travel })));
const NonMotor = lazy(() => import('../pages/My Polices/NonMotor').then(module => ({ default: module.NonMotor })));
const Other = lazy(() => import('../pages/My Polices/Other').then(module => ({ default: module.Other })));
const CRM = lazy(() => import('../pages/CRM').then(module => ({ default: module.CRM })));

// My Renewal pages
const LeadRenewal = lazy(() => import('../pages/My Renewal/Lead').then(module => ({ default: module.Lead })));
const LifeRenewal = lazy(() => import('../pages/My Renewal/Life').then(module => ({ default: module.Life })));
const HealthRenewal = lazy(() => import('../pages/My Renewal/health').then(module => ({ default: module.Health })));
const MotorRenewal = lazy(() => import('../pages/My Renewal/motor').then(module => ({ default: module.Motor })));


const PremiumCalculator = lazy(() => import('../pages/PremiumCalculator').then(module => ({ default: module.PremiumCalculator })));

export const appRoutesConfig: AppRoute = {
  path: '/',
  element: <AppLayout />,
  children: [
    {
      label: 'Dashboard',
      path: '', 
      icon: <IconDashboard size="1rem" stroke={1.5} />,
      element: (
        <Suspense fallback={<SuspenseLoader />}>
          <Dashboard />
        </Suspense>
      )
    },
    {
      label: 'My Policies',
      path: 'my-policies',
      icon: <IconBriefcase size="1rem" stroke={1.5} />,
      children: [
        {
          label: 'Motor',
          path: 'motor',
          icon: <IconCar size="1rem" stroke={1.5} />,
          element: (
            <Suspense fallback={<SuspenseLoader />}>
              <Motor />
            </Suspense>
          )
        },
        {
          label: 'Health',
          path: 'health',
          icon: <IconHeartbeat size="1rem" stroke={1.5} />,
          element: (
            <Suspense fallback={<SuspenseLoader />}>
              <Health />
            </Suspense>
          )
        },
        {
          label: 'Travel',
          path: 'travel',
          icon: <IconPlane size="1rem" stroke={1.5} />,
          element: (
            <Suspense fallback={<SuspenseLoader />}>
              <Travel />
            </Suspense>
          )
        },
        {
          label: 'Non Motor',
          path: 'non-motor',
          icon: <IconBuilding size="1rem" stroke={1.5} />,
          element: (
            <Suspense fallback={<SuspenseLoader />}>
              <NonMotor />
            </Suspense>
          )
        },
        {
          label: 'Life',
          path: 'life',
          icon: <IconUser size="1rem" stroke={1.5} />,
          element: (
            <Suspense fallback={<SuspenseLoader />}>
              <Life />
            </Suspense>
          )
        },
        {
          label: 'Other',
          path: 'other',
          icon: <IconDots size="1rem" stroke={1.5} />,
          element: (
            <Suspense fallback={<SuspenseLoader />}>
              <Other />
            </Suspense>
          )
        }
      ]
    },
    
    {
      label: 'My Renewal',
      path: 'my-renewal',
      icon: <IconRefresh size="1rem" stroke={1.5} />,
      children: [
        {
          label: 'Motor',
          path: 'motor',
          icon: <IconCar size="1rem" stroke={1.5} />,
          element: (
            <Suspense fallback={<SuspenseLoader />}>
              <MotorRenewal />
            </Suspense>
          )
        },
        {
          label: 'Health',
          path: 'health',
          icon: <IconHeartbeat size="1rem" stroke={1.5} />,
          element: (
            <Suspense fallback={<SuspenseLoader />}>
              <HealthRenewal />
            </Suspense>
          )
        },
        {
          label: 'Life',
          path: 'life',
          icon: <IconUser size="1rem" stroke={1.5} />,
          element: (
            <Suspense fallback={<SuspenseLoader />}>
              <LifeRenewal />
            </Suspense>
          )
        },
        {
          label: 'Lead',
          path: 'lead',
          icon: <IconDots size="1rem" stroke={1.5} />,
          element: (
            <Suspense fallback={<SuspenseLoader />}>
              <LeadRenewal />
            </Suspense>
          )
        }
      ]
    },
    {
      label: 'GST Registration',
      path: 'gst-registration',
      icon: <IconFileCertificate size="1rem" stroke={1.5} />,
      element: (
        <Suspense fallback={<SuspenseLoader />}>
          <GSTRegistration />
        </Suspense>
      )
    },
    {
      label: 'e-TDS',
      path: 'e-tds',
      icon: <IconReceiptTax size="1rem" stroke={1.5} />,
      element: (
        <Suspense fallback={<SuspenseLoader />}>
          <ETDS />
        </Suspense>
      )
    },
    {
      label: 'ITR Filing',
      path: 'itr-filing',
      icon: <IconReportMoney size="1rem" stroke={1.5} />,
      element: (
        <Suspense fallback={<SuspenseLoader />}>
          <ITRFiling />
        </Suspense>
      )
    },
    {
      label: 'Task',
      path: 'task',
      icon: <IconListCheck size="1rem" stroke={1.5} />,
      element: (
        <Suspense fallback={<SuspenseLoader />}>
          <Task />
        </Suspense>
      )
    },
    {
      label: 'CRM',
      path: 'crm',
      icon: <IconUser size="1rem" stroke={1.5} />,
      element: (
        <Suspense fallback={<SuspenseLoader />}>
          <CRM />
        </Suspense>
      )
    },
    {
      label: 'Premium Calculator',
      path: 'premium-calculator',
      icon: <IconCalculator size="1rem" stroke={1.5} />,
      element: (
        <Suspense fallback={<SuspenseLoader />}>
       <PremiumCalculator />
        </Suspense>
      )
    },
    
 
  ]
};
