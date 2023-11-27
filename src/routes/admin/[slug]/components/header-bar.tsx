import type { ButtonProps } from 'antd';
import { Button, Divider, Space, theme } from 'antd';
import { Profile } from '~/components/profile';
import { ThemeChanger } from '~/components/theme-changer';
import { BarsIcon } from '~/components/icons';

type ButtonClickEventHandler = Required<ButtonProps>['onClick'];

export type HeaderBarProps = {
  onSidebarOpen: ButtonClickEventHandler;
};

export const HeaderBar = ({ onSidebarOpen }: HeaderBarProps) => {
  const { token } = theme.useToken();
  return (
    <div
      className="flex h-16 items-center gap-x-4 border-b px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-4 lg:shadow-none"
      style={{
        borderColor: token.colorBorderSecondary,
        backgroundColor: token.colorBgContainer,
      }}
    >
      <Button
        icon={<BarsIcon />}
        className="lg:hidden"
        onClick={onSidebarOpen}
      />
      <Divider type="vertical" className="h-6 lg:hidden" aria-hidden="true" />
      <Space className="ml-auto" size={'middle'}>
        <ThemeChanger />
        <Profile />
      </Space>
    </div>
  );
};
