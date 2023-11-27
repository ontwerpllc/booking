import { ConfigProvider, theme } from 'antd';
import { useTheme } from '~/hooks/useTheme';

export type ThemeProviderProps = {
  children: React.ReactNode;
};

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
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
