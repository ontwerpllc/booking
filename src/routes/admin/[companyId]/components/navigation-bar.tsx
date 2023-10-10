import { Select, Menu, Divider, Button, MenuProps, Typography } from 'antd';
import BrandIcon from '../../../../components/brand-icon';

const { Text } = Typography;

const { VITE_APP_VERSION, VITE_BRAND_NAME } = import.meta.env;

type MenuItem = Required<MenuProps>['items'][number];

type Props = {
  menuItems: MenuItem[];
  onMenuSelect: (item: MenuItem) => void;
  onBusinessSelect: (companyId: string) => void;
};

const NavigationBar = (props: Props) => {
  const { menuItems, onMenuSelect, onBusinessSelect } = props;

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
            <Text type="secondary">$10/mo</Text>
          </div>
          <Button>Modify</Button>
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
