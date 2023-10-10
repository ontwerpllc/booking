import {
  Avatar,
  Button,
  ButtonProps,
  Divider,
  Dropdown,
  MenuProps,
  theme,
} from 'antd';
import BarsIcon from '../../../../icons/bars';

const { useToken } = theme;

type MenuItem = Required<MenuProps>['items'][number];
type ButtonClickEventHandler = Required<ButtonProps>['onClick'];

type Props = {
  profileItems: MenuItem[];
  onSidebarOpen: ButtonClickEventHandler;
};

const HeaderBar = (props: Props) => {
  const { onSidebarOpen, profileItems } = props;
  const { token } = useToken();

  return (
    <div
      className="flex h-16 items-center gap-x-4 border-b px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-4 lg:shadow-none"
      style={{
        borderColor: token.colorBorderSecondary,
        backgroundColor: token.colorBgBase,
      }}
    >
      <Button
        icon={<BarsIcon />}
        className="lg:hidden"
        onClick={onSidebarOpen}
      />

      <Divider type="vertical" className="h-6 lg:hidden" aria-hidden="true" />

      <div className="ml-auto flex gap-x-4">
        <div className="flex items-center gap-x-4">
          <Dropdown menu={{ items: profileItems }} arrow>
            <Avatar className="select-none cursor-pointer">U</Avatar>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default HeaderBar;
