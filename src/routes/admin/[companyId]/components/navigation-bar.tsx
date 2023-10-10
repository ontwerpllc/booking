import {
  Select,
  Menu,
  Divider,
  Button,
  MenuProps,
  Typography,
  Skeleton,
  SelectProps,
} from 'antd';
import BrandIcon from '../../../../components/brand-icon';

const { Text } = Typography;

const { VITE_APP_VERSION, VITE_BRAND_NAME } = import.meta.env;

type MenuItem = Required<MenuProps>['items'][number];
type MenuSelectEventHandler = Required<MenuProps>['onSelect'];
type SelectEventHandler = Required<SelectProps>['onSelect'];

type Props = {
  menuItems: MenuItem[];
  onMenuSelect: MenuSelectEventHandler;
  onBusinessSelect: SelectEventHandler;
  isLoading?: boolean;
};

const NavigationBar = (props: Props) => {
  const { menuItems, onMenuSelect, onBusinessSelect, isLoading } = props;

  return (
    <>
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
          onSelect={onBusinessSelect}
          options={[]}
          loading={isLoading}
        />
      </div>
      <Menu
        className="mt-4"
        mode="inline"
        items={menuItems}
        defaultSelectedKeys={['bookings']}
        onSelect={onMenuSelect}
      />
      <div className="mt-auto mx-4">
        <Divider />
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <Text>Current Plan</Text>
            {isLoading ? (
              <Skeleton paragraph={false} active />
            ) : (
              <Text type="secondary">$10/mo</Text>
            )}
          </div>
          <Button disabled={isLoading}>Modify</Button>
        </div>
        <Divider />
        <div>
          <Text type="secondary">Version {VITE_APP_VERSION}</Text>
        </div>
      </div>
    </>
  );
};

export default NavigationBar;
