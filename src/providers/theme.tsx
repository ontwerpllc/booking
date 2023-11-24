import type { ThemeConfig } from 'antd';
import { ConfigProvider } from 'antd';

const theme = {
  token: {
    colorPrimary: '#3b1cb5',
  },
  components: {
    Menu: {
      activeBarBorderWidth: 0,
    },
  },
} satisfies ThemeConfig;

type Props = {
  children: React.ReactNode;
};

export const ThemeProvider = (props: Props) => {
  const { children } = props;
  return <ConfigProvider theme={theme}>{children}</ConfigProvider>;
};
