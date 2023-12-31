import type { MenuProps } from 'antd';
import {
  Select,
  Menu,
  Divider,
  Button,
  Typography,
  Skeleton,
  theme,
} from 'antd';
import { useState } from 'react';
import { env } from '~/lib/env';
import { PlanModal } from './plan-modal';
import { BrandIcon } from '~/components/brand-icon';
import { useOrganization } from '~/api/hooks/org';
import { useMemberships } from '~/api/hooks/user';
import { BookingIcon, AnalyticsIcon, UsersIcon, SettingsIcon } from '~/icons';
import { PATH } from '~/constants/paths';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTypedSearchParams } from '~/hooks/useTypedSearchParams';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key?: null | React.Key,
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

const getParentKeys = (path: string) => {
  return path.split('/').splice(0, path.split('/').length - 1);
};

type Props = {
  onClosableAction?: () => void;
};

export const NavigationBar = (props: Props) => {
  const { onClosableAction } = props;
  const params = useTypedSearchParams<'admin.dashboard'>();
  const organization = useOrganization({ slug: params.get('org') });
  const memberships = useMemberships();
  const location = useLocation();
  const navigate = useNavigate();
  const { token } = theme.useToken();

  const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);

  const onPlanModalOpen = () => {
    setIsPlanModalOpen(true);
  };

  const onMenuSelectWrapper = (item: MenuItem) => {
    if (!item?.key || !organization.data) return;
    onClosableAction?.();
    navigate({
      pathname: item.key.toString(),
      search: params.query,
    });
  };

  const onOrganizationSelect = (value: string) => {
    params.set('org', value);
    onClosableAction?.();
  };

  return (
    <div
      className="flex flex-col justify-between h-full"
      style={{ backgroundColor: token.colorBgBase }}
    >
      <div>
        <div className="flex my-4 shrink-0 items-center mx-4 gap-2">
          <BrandIcon className="h-8 w-auto" />
          <Typography.Text className="text-2xl font-semibold uppercase">
            {env.BRAND_NAME}
          </Typography.Text>
        </div>
        <div className="mx-4">
          <Select
            className="w-full"
            placeholder="Select an organization"
            onSelect={onOrganizationSelect}
            options={memberships.data?.map((membership) => ({
              label: membership.organization?.name,
              value: membership.organization?.slug,
            }))}
            value={organization?.data?.slug}
            loading={memberships.isLoading}
          />
        </div>
        <Menu
          className="mt-4"
          mode="inline"
          items={[
            getItem(
              'Shortcuts',
              null,
              null,
              [
                getItem(
                  'Bookings',
                  PATH.admin.dashboard.index,
                  <BookingIcon />,
                ),
                getItem(
                  'Analytics',
                  PATH.admin.dashboard.analytics,
                  <AnalyticsIcon />,
                ),
                getItem(
                  'Customers',
                  PATH.admin.dashboard.customers,
                  <UsersIcon />,
                ),
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
                  getItem('General', PATH.admin.dashboard.settings.general),
                  getItem(
                    'Time Slots',
                    PATH.admin.dashboard.settings.timeSlots,
                  ),
                ]),
              ],
              'group',
            ),
          ]}
          defaultSelectedKeys={[location.pathname]}
          defaultOpenKeys={getParentKeys(location.pathname)}
          onSelect={onMenuSelectWrapper}
          selectedKeys={[location.pathname]}
        />
      </div>
      <div className="mt-auto mx-4">
        <Divider />
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <Typography.Text>{/** TODO: Add data */}</Typography.Text>
            {memberships.isLoading ? (
              <Skeleton paragraph={false} active />
            ) : (
              <Typography.Text type="secondary">
                {/** TODO: Add data */}
              </Typography.Text>
            )}
          </div>
          <Button disabled={memberships.isLoading} onClick={onPlanModalOpen}>
            Modify
          </Button>
        </div>
        <Divider />
        <div>
          <Typography.Text type="secondary">
            Version {env.APP_VERSION}
          </Typography.Text>
        </div>
      </div>

      <PlanModal
        isModalOpen={isPlanModalOpen}
        setIsModalOpen={setIsPlanModalOpen}
      />
    </div>
  );
};
