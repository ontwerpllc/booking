import {
  type RouteObject,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';
import Index from '../routes';
import Login from '../routes/auth/login';
import Register from '../routes/auth/register';
import NotFound from '../routes/not-found';
import AdminLogin from '../routes/admin/auth/login';
import AdminRegister from '../routes/admin/auth/register';
import AdminDashboardIndex from '../routes/admin/dashboard';
import AdminDashboardLayout from '../routes/admin/dashboard/layout';
import AdminDashboardAnalytics from '../routes/admin/dashboard/analytics';
import AdminDashboardSettingsGeneral from '../routes/admin/dashboard/settings/general';
import AdminDashboardSettingsTimeSlots from '../routes/admin/dashboard/settings/time-slots';
import AdminDashboardCustomers from '../routes/admin/dashboard/customers';
import { ProtectedLayout } from '~/layouts/protected';
import { useMemo } from 'react';
import { PATHS } from '~/constants/paths';

const routes = [
  {
    path: PATHS.index,
    element: <Index />,
  },
  {
    children: [
      {
        path: PATHS.auth.login,
        element: <Login />,
      },
      {
        path: PATHS.auth.register,
        element: <Register />,
      },
    ],
  },
  {
    children: [
      {
        path: PATHS.admin.auth.login,
        element: <AdminLogin />,
      },
      {
        path: PATHS.admin.auth.register,
        element: <AdminRegister />,
      },
      {
        element: (
          <ProtectedLayout redirect={PATHS.admin.auth.login}>
            <AdminDashboardLayout />
          </ProtectedLayout>
        ),
        children: [
          {
            path: PATHS.admin.dashboard.index,
            element: <AdminDashboardIndex />,
          },
          {
            path: PATHS.admin.dashboard.analytics,
            element: <AdminDashboardAnalytics />,
          },
          {
            path: PATHS.admin.dashboard.customers,
            element: <AdminDashboardCustomers />,
          },
          {
            path: PATHS.admin.dashboard.settings.general,
            element: <AdminDashboardSettingsGeneral />,
          },
          {
            path: PATHS.admin.dashboard.settings.timeSlots,
            element: <AdminDashboardSettingsTimeSlots />,
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
] satisfies RouteObject[];

export const Router = () => (
  <RouterProvider router={useMemo(() => createBrowserRouter(routes), [])} />
);
