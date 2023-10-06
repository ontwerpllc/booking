import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Index from '../routes';
import Login from '../routes/auth/login';
import Register from '../routes/auth/register';
import NotFound from '../routes/not-found';
import AdminLogin from '../routes/admin/auth/login';
import AdminRegister from '../routes/admin/auth/register';

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
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

const Router = () => <RouterProvider router={router} />;

export default Router;
