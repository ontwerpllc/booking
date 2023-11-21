import { Spin } from 'antd';
import { Navigate, type NavigateProps } from 'react-router-dom';
import { useAuth } from '~/api/hooks/auth';

type ProtectedLayoutProps = {
  redirect: NavigateProps['to'];
  children: React.ReactNode;
};

export const ProtectedLayout = ({
  redirect,
  children,
}: ProtectedLayoutProps) => {
  const { data: session, isLoading } = useAuth();
  if (isLoading) {
    return (
      <div className="h-full w-full grid place-items-center">
        <Spin size="large" />
      </div>
    );
  }
  if (!session) {
    return <Navigate to={redirect} />;
  }
  return children;
};
