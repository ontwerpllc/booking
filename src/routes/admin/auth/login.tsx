import { BrandIcon } from '~/components/brand-icon';
import { LoginForm } from './components/login-form';
import { Button, Divider, Typography } from 'antd';
import { AppleIcon, GoogleIcon } from '~/components/icons';
import { useSignInWithOAuth, useSignInWithPassword } from '~/api/hooks/auth';
import { PATH } from '~/lib/paths';

const AdminLogin = () => {
  const loginMutation = useSignInWithPassword({
    redirectTo: PATH.admin.dashboard.index,
  });
  const loginOAuth = useSignInWithOAuth({
    redirectTo: PATH.admin.dashboard.index,
  });
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <BrandIcon className="mx-auto h-10 w-auto" />
          <Typography.Title level={2} className="mt-10 text-center">
            Sign in to your account
          </Typography.Title>
        </div>

        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <LoginForm
            onSubmit={(data) =>
              loginMutation.mutate({
                email: data.email,
                password: data.password,
              })
            }
            isLoading={loginMutation.isPending}
          />
          <Divider />
          <div className="flex gap-4">
            <Button
              block
              icon={<GoogleIcon />}
              onClick={() =>
                loginOAuth.mutate({
                  provider: 'google',
                })
              }
              loading={loginOAuth.isPending}
            />
            <Button
              block
              icon={<AppleIcon />}
              onClick={() =>
                loginOAuth.mutate({
                  provider: 'apple',
                })
              }
              loading={loginOAuth.isPending}
            />
          </div>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{' '}
            <Typography.Link
              href="register"
              className="font-semibold leading-6"
            >
              Sign up here
            </Typography.Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
