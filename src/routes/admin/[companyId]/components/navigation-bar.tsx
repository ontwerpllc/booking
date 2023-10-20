import {
  Select,
  Menu,
  Divider,
  Button,
  MenuProps,
  Typography,
  Skeleton,
  SelectProps,
  theme,
} from 'antd';
import BrandIcon from '../../../../components/brand-icon';
import { Navigate, useLocation } from 'react-router-dom';
import PlanModal from './plan-modal';
import { useState } from 'react';
import { getBusinesses } from '../../../../api/functions/getBusinesses';

const { Text } = Typography;
const { useToken } = theme;

const { VITE_APP_VERSION, VITE_BRAND_NAME } = import.meta.env;

type MenuItem = Required<MenuProps>['items'][number];
type MenuSelectEventHandler = Required<MenuProps>['onSelect'];
type SelectEventHandler = Required<SelectProps>['onSelect'];

type Props = {
  menuItems: MenuItem[];
  businesses: SelectProps['options'];
  selectedBusinessUid?: string;
  defaultBusiness?: string;
  onMenuSelect: MenuSelectEventHandler;
  onBusinessSelect: SelectEventHandler;
  onClosableAction?: () => void;
  isLoading?: boolean;
  basePath: string;
};

const getPathkey = (path: string, basePath: string) => {
  return path.split('/').slice(basePath.split('/').length).join('/') || './';
};

const getSelectedParentKeys = (path: string) => {
  return path.split('/').splice(0, path.split('/').length - 1);
};

const NavigationBar = (props: Props) => {
  const {
    menuItems,
    onMenuSelect,
    onBusinessSelect,
    onClosableAction,
    selectedBusinessUid,
    defaultBusiness,
    isLoading,
    basePath,
    businesses,
  } = props;
  const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);
  const { token } = useToken();
  const location = useLocation();

  const selectedPathKey = getPathkey(location.pathname, basePath);

  const onPlanModalOpen = () => {
    setIsPlanModalOpen(true);
  };

  const onMenuSelectWrapper: MenuSelectEventHandler = (info) => {
    onMenuSelect(info);
    onClosableAction?.();
  };

  const onBusinessSelectWrapper: SelectEventHandler = (value, option) => {
    onBusinessSelect(value, option);
  };

  const isDefaultBusiness = selectedBusinessUid === 'default';

  const selectedBusiness =
    businesses?.find((business) => business.value === selectedBusinessUid) ??
    isDefaultBusiness
      ? businesses?.find((business) => business.value === defaultBusiness)
      : null;

  if (selectedBusiness?.value !== defaultBusiness && !isDefaultBusiness) {
    if (!selectedBusiness?.value) {
      return <Navigate to={`/admin/default`} />;
    }

    return <Navigate to={`/admin/${selectedBusiness?.value}`} />;
  }

  const business = getBusinesses().find(
    (business) => business.uid === selectedBusinessUid,
  );

  return (
    <div
      className="flex flex-col justify-between h-full"
      style={{ backgroundColor: token.colorBgBase }}
    >
      <div>
        <div className="flex my-4 shrink-0 items-center mx-4 gap-2">
          <BrandIcon className="h-8 w-auto" />
          <Text className="text-2xl font-semibold uppercase">
            {VITE_BRAND_NAME}
          </Text>
        </div>
        <div className="mx-4">
          <Select
            className="w-full"
            placeholder="Select a business"
            onSelect={onBusinessSelectWrapper}
            options={businesses}
            loading={isLoading}
            defaultValue={selectedBusiness?.value}
          />
        </div>
        <Menu
          className="mt-4"
          mode="inline"
          items={menuItems}
          defaultSelectedKeys={[selectedPathKey]}
          defaultOpenKeys={getSelectedParentKeys(selectedPathKey)}
          onSelect={onMenuSelectWrapper}
        />
      </div>
      <div className="mt-auto mx-4">
        <Divider />
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <Text>{business?.subscription.name}</Text>
            {isLoading ? (
              <Skeleton paragraph={false} active />
            ) : (
              <Text type="secondary">{`$${business?.subscription.price}/mo`}</Text>
            )}
          </div>
          <Button disabled={isLoading} onClick={onPlanModalOpen}>
            Modify
          </Button>
        </div>
        <Divider />
        <div>
          <Text type="secondary">Version {VITE_APP_VERSION}</Text>
        </div>
      </div>

      <PlanModal
        isModalOpen={isPlanModalOpen}
        setIsModalOpen={setIsPlanModalOpen}
      />
    </div>
  );
};

export default NavigationBar;
