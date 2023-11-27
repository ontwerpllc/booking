import { ConfigProvider, theme } from 'antd';
import { useTheme } from '~/hooks/useTheme';

type Props = {
  children: React.ReactNode;
};

export const ThemeProvider = (props: Props) => {
  const { children } = props;
  const { theme: currentTheme } = useTheme();
  return (
    <ConfigProvider
      theme={{
        algorithm:
          currentTheme === 'light'
            ? theme.defaultAlgorithm
            : theme.darkAlgorithm,
        token: {
          colorPrimary: '#3b1cb5',
        },
        components: {
          Menu: {
            activeBarBorderWidth: 0,
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};
