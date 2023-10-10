import { ConfigProvider, ThemeConfig } from 'antd';

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

const ThemeProvider = (props: Props) => {
  const { children } = props;
  return <ConfigProvider theme={theme}>{children}</ConfigProvider>;
};

export default ThemeProvider;
