import { Button, Dropdown } from 'antd';
import { useTheme } from '~/hooks/useTheme';
import { DarkModeIcon, LightModeIcon } from '~/icons/theme';

export const ThemeChanger = () => {
  const { theme, setTheme } = useTheme();

  return (
    <Dropdown
      trigger={['click']}
      menu={{
        items: [
          {
            key: 'light',
            label: 'Light',
            onClick: () => setTheme('light'),
          },
          {
            key: 'dark',
            label: 'Dark',
            onClick: () => setTheme('dark'),
          },
          {
            key: 'system',
            label: 'System',
            onClick: () => setTheme('system'),
          },
        ],
      }}
      arrow
      placement="bottomRight"
    >
      <Button icon={theme === 'light' ? <LightModeIcon /> : <DarkModeIcon />} />
    </Dropdown>
  );
};
