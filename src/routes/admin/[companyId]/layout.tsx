import { Outlet, useNavigate, useParams } from 'react-router-dom';

import { Card, Drawer, MenuProps, theme } from 'antd';
import AnalyticsIcon from '../../../icons/analytics';
import BookingIcon from '../../../icons/booking';
import UsersIcon from '../../../icons/users';
import SettingsIcon from '../../../icons/settings';

import NavigationBar from './components/navigation-bar';
import { useState } from 'react';
import HeaderBar from './components/header-bar';

type MenuItem = Required<MenuProps>['items'][number];

const { useToken } = theme;

function getItem(
  label: React.ReactNode,
  key?: React.Key | null,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const basePath = '/admin/:companyId';

const AdminDashboardLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const { companyId } = useParams();
  const { token } = useToken();
  const navigate = useNavigate();

  const onMenuSelect = (item: MenuItem) => {
    if (!item?.key) return;
    navigate(`/admin/${companyId}/${item.key}`);
  };

  const onBusinessSelect = (companyId: string) => {
    navigate(`/admin/${companyId}/`);
  };

  const onSidebarOpen = () => {
    setSidebarOpen(true);
  };

  const onSidebarClose = () => {
    setSidebarOpen(false);
  };

  // TODO: implement loading state
  const isLoading = false;

  const profileItems = [
    {
      label: 'Your Profile',
      key: 'profile',
      onClick: () => {
        // TODO: implement
      },
    },
    {
      label: 'Sign out',
      key: 'sign-out',
      danger: true,
      onClick: () => {
        // TODO: implement
      },
    },
  ] satisfies MenuProps['items'];

  const navigationItems = [
    getItem(
      'Shortcuts',
      null,
      null,
      [
        getItem('Bookings', './', <BookingIcon />),
        getItem('Analytics', 'analytics', <AnalyticsIcon />),
        getItem('Customers', 'customers', <UsersIcon />),
      ],
      'group',
    ),
    { type: 'divider' },
    getItem(
      'Extra',
      null,
      null,
      [
        getItem('Settings', 'settings', <SettingsIcon />, [
          getItem('General', 'settings/general'),
          getItem('Time Slots', 'settings/time-slots'),
        ]),
      ],
      'group',
    ),
  ] satisfies MenuItem[];

  return (
    <>
      <div>
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          <div
            className="flex grow flex-col overflow-y-auto border-r px-2 pb-4"
            style={{ borderColor: token.colorBorderSecondary }}
          >
            <NavigationBar
              basePath={basePath}
              menuItems={navigationItems}
              onMenuSelect={onMenuSelect}
              onBusinessSelect={onBusinessSelect}
              isLoading={isLoading}
            />
          </div>
        </div>

        <div className="lg:pl-72">
          <div className="sticky top-0 z-40 lg:mx-auto">
            <HeaderBar
              onSidebarOpen={onSidebarOpen}
              profileItems={profileItems}
            />
          </div>
          <main className="py-4">
            <Card className="mx-4 px-4 sm:px-6 lg:px-8">
              <Outlet />
            </Card>
          </main>
        </div>
      </div>

      <Drawer
        className="flex flex-col"
        placement="left"
        onClose={onSidebarClose}
        open={isSidebarOpen}
      >
        <NavigationBar
          basePath={basePath}
          menuItems={navigationItems}
          onMenuSelect={onMenuSelect}
          onBusinessSelect={onBusinessSelect}
          isLoading={isLoading}
        />
      </Drawer>
    </>
  );
};

export default AdminDashboardLayout;
