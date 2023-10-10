import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Index from '../routes';
import Login from '../routes/auth/login';
import Register from '../routes/auth/register';
import NotFound from '../routes/not-found';
import AdminLogin from '../routes/admin/auth/login';
import AdminRegister from '../routes/admin/auth/register';
import AdminDashboardIndex from '../routes/admin/[companyId]';
import AdminDashboardLayout from '../routes/admin/[companyId]/layout';
import AdminDashboardAnalytics from '../routes/admin/[companyId]/analytics';
import AdminDashboardSettingsGeneral from '../routes/admin/[companyId]/settings/general';
import AdminDashboardSettingsTimeSlots from '../routes/admin/[companyId]/settings/time-slots';
import AdminDashboardCustomers from '../routes/admin/[companyId]/customers';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Index />,
  },
  {
    children: [
      {
        path: 'auth/login',
        element: <Login />,
      },
      {
        path: 'auth/register',
        element: <Register />,
      },
    ],
  },
  {
    children: [
      {
        path: 'admin/auth/login',
        element: <AdminLogin />,
      },
      {
        path: 'admin/auth/register',
        element: <AdminRegister />,
      },
      {
        element: <AdminDashboardLayout />,
        children: [
          {
            path: 'admin/:companyId/',
            element: <AdminDashboardIndex />,
          },
          {
            path: 'admin/:companyId/analytics',
            element: <AdminDashboardAnalytics />,
          },
          {
            path: 'admin/:companyId/customers',
            element: <AdminDashboardCustomers />,
          },
          {
            path: 'admin/:companyId/settings/general',
            element: <AdminDashboardSettingsGeneral />,
          },
          {
            path: 'admin/:companyId/settings/time-slots',
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
]);

const Router = () => <RouterProvider router={router} />;

export default Router;
