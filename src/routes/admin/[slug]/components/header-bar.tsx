import type { ButtonProps } from 'antd';
import { Button, Divider, theme } from 'antd';
import { Profile } from '~/components/profile';
import { BarsIcon } from '~/icons';

const { useToken } = theme;

type ButtonClickEventHandler = Required<ButtonProps>['onClick'];

type Props = {
  onSidebarOpen: ButtonClickEventHandler;
};

export const HeaderBar = (props: Props) => {
  const { onSidebarOpen } = props;
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
          <Profile />
        </div>
      </div>
    </div>
  );
};
