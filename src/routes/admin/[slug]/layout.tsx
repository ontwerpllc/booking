import { Outlet } from 'react-router-dom';

import { Button, Drawer, Empty, theme } from 'antd';

import { useState } from 'react';

import { HeaderBar } from './components/header-bar';
import { NavigationBar } from './components/navigation-bar';
import { NewOrganizationModal } from './components/new-organization-modal';
import { useMemberships } from '~/api/hooks/user';
import { PlusSmallIcon } from '~/components/icons';

const AdminDashboardLayout = () => {
  const memberships = useMemberships();
  const { token } = theme.useToken();
  const [isNewOrganizationModalOpen, setIsNewOrganizationModalOpen] =
    useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const onSidebarOpen = () => {
    setSidebarOpen(true);
  };

  const onSidebarClose = () => {
    setSidebarOpen(false);
  };

  const onClosableAction = () => {
    setSidebarOpen(false);
  };

  const onNewOrganizationModalOpen = () => {
    setIsNewOrganizationModalOpen(true);
  };

  return (
    <>
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <div
          className="flex grow flex-col overflow-y-auto border-r "
          style={{ borderColor: token.colorBorderSecondary }}
        >
          <NavigationBar />
        </div>
      </div>

      <div className="lg:pl-72">
        <div className="sticky top-0 z-40 lg:mx-auto">
          <HeaderBar onSidebarOpen={onSidebarOpen} />
        </div>
        <main
          className="py-4 h-full"
          style={{ backgroundColor: token.colorBgContainer }}
        >
          <div className="mx-4 px-4 sm:px-6 lg:px-8">
            {memberships?.data?.length ? (
              <Outlet />
            ) : (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description={'No avaliable organizations'}
              >
                <Button
                  type="primary"
                  icon={<PlusSmallIcon />}
                  onClick={onNewOrganizationModalOpen}
                >
                  New Organization
                </Button>
              </Empty>
            )}
          </div>
        </main>
      </div>

      <Drawer
        className="flex flex-col"
        placement="left"
        onClose={onSidebarClose}
        open={isSidebarOpen}
        style={{ backgroundColor: token.colorBgContainer }}
      >
        <NavigationBar onClosableAction={onClosableAction} />
      </Drawer>

      <NewOrganizationModal
        isModalOpen={isNewOrganizationModalOpen}
        setIsModalOpen={setIsNewOrganizationModalOpen}
      />
    </>
  );
};

export default AdminDashboardLayout;
