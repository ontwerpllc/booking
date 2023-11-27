import {
  type RouteObject,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';
import Index from '../../routes';
import Login from '../../routes/auth/login';
import Register from '../../routes/auth/register';
import NotFound from '../../routes/not-found';
import AdminLogin from '../../routes/admin/auth/login';
import AdminRegister from '../../routes/admin/auth/register';
import AdminDashboardIndex from '../../routes/admin/[slug]';
import AdminDashboardLayout from '../../routes/admin/[slug]/layout';
import AdminDashboardAnalytics from '../../routes/admin/[slug]/analytics';
import AdminDashboardSettingsGeneral from '../../routes/admin/[slug]/settings/general';
import AdminDashboardSettingsTimeSlots from '../../routes/admin/[slug]/settings/time-slots';
import AdminDashboardCustomers from '../../routes/admin/[slug]/customers';
import { AuthProtected } from '~/components/guards/protected';
import { useMemo } from 'react';
import { PATH } from '~/lib/paths';
import { DefaultOrgProtected } from '~/components/guards/default-slug';
import { theme } from 'antd';

const routes = [
  {
    path: PATH.index,
    element: <Index />,
  },
  {
    children: [
      {
        path: PATH.auth.login,
        element: <Login />,
      },
      {
        path: PATH.auth.register,
        element: <Register />,
      },
    ],
  },
  {
    children: [
      {
        path: PATH.admin.auth.login,
        element: <AdminLogin />,
      },
      {
        path: PATH.admin.auth.register,
        element: <AdminRegister />,
      },
      {
        element: (
          <AuthProtected redirect={PATH.admin.auth.login}>
            <DefaultOrgProtected>
              <AdminDashboardLayout />
            </DefaultOrgProtected>
          </AuthProtected>
        ),
        children: [
          {
            path: PATH.admin.dashboard.index,
            element: <AdminDashboardIndex />,
          },
          {
            path: PATH.admin.dashboard.analytics,
            element: <AdminDashboardAnalytics />,
          },
          {
            path: PATH.admin.dashboard.customers,
            element: <AdminDashboardCustomers />,
          },
          {
            path: PATH.admin.dashboard.settings.general,
            element: <AdminDashboardSettingsGeneral />,
          },
          {
            path: PATH.admin.dashboard.settings.timeSlots,
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

export const Router = () => {
  const { token } = theme.useToken();
  return (
    <div className="h-full" style={{ backgroundColor: token.colorBgContainer }}>
      <RouterProvider router={useMemo(() => createBrowserRouter(routes), [])} />
    </div>
  );
};
