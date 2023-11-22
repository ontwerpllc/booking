import { Spin } from 'antd';
import { Navigate } from 'react-router-dom';
import { useAuth } from '~/api/hooks/auth';
import { type Path } from '~/constants/paths';

type ProtectedLayoutProps = {
  redirect: Path;
  children: React.ReactNode;
};

export const ProtectedLayout = ({
  redirect,
  children,
}: ProtectedLayoutProps) => {
  const auth = useAuth();
  if (auth.isLoading) {
    return (
      <div className="h-full w-full grid place-items-center">
        <Spin size="large" />
      </div>
    );
  }
  if (!auth.data?.session) {
    return <Navigate to={redirect} />;
  }
  return children;
};
