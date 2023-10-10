import { Outlet, useNavigate, useParams } from 'react-router-dom';

import { Button, Card, Divider, Drawer, MenuProps } from 'antd';
import AnalyticsIcon from '../../../icons/analytics';
import BookingIcon from '../../../icons/booking';
import UsersIcon from '../../../icons/users';
import SettingsIcon from '../../../icons/settings';
import BarsIcon from '../../../icons/bars';
import NavigationBar from './components/navigation-bar';
import { useState } from 'react';

type MenuItem = Required<MenuProps>['items'][number];

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

const items: MenuItem[] = [
  getItem(
    'Shortcuts',
    null,
    null,
    [
      getItem('Bookings', 'bookings', <BookingIcon />),
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
      getItem('Settings', null, <SettingsIcon />, [
        getItem('General', 'settings/general'),
        getItem('Time Slots', 'settings/time-slots'),
      ]),
    ],
    'group',
  ),
];

const AdminDashboardLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const { companyId } = useParams();
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

  return (
    <>
      <div>
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          <div className="flex grow flex-col overflow-y-auto border-r border-gray-200 px-2 pb-4">
            <NavigationBar
              menuItems={items}
              onMenuSelect={onMenuSelect}
              onBusinessSelect={onBusinessSelect}
            />
          </div>
        </div>

        <div className="lg:pl-72">
          <div className="sticky top-0 z-40 lg:mx-auto">
            <div className="flex h-16 items-center gap-x-4 border-b border-gray-200 px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-0 lg:shadow-none">
              <Button
                icon={<BarsIcon />}
                className="lg:hidden"
                onClick={onSidebarOpen}
              />

              <Divider
                type="vertical"
                className="h-6 lg:hidden"
                aria-hidden="true"
              />

              <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
                <div className="flex items-center gap-x-4 lg:gap-x-6">
                  {/* Header */}
                </div>
              </div>
            </div>
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
        closable={false}
      >
        <NavigationBar
          menuItems={items}
          onMenuSelect={onMenuSelect}
          onBusinessSelect={onBusinessSelect}
        />
      </Drawer>
    </>
  );
};

export default AdminDashboardLayout;
