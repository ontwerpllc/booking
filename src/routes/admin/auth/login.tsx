import { BrandIcon } from '~/components/brand-icon';
import { LoginForm } from './components/login-form';
import { Button, Divider, Typography } from 'antd';
import { AppleIcon, GoogleIcon } from '~/icons';
import { useSignInWithOAuth, useSignInWithPassword } from '~/api/hooks/auth';

const { Title, Link } = Typography;

const AdminLogin = () => {
  const loginMutation = useSignInWithPassword();
  const loginOAuth = useSignInWithOAuth();
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <BrandIcon className="mx-auto h-10 w-auto" />
          <Title level={2} className="mt-10 text-center">
            Sign in to your account
          </Title>
        </div>

        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <LoginForm
            onSubmit={(data) =>
              loginMutation.mutate({
                email: data.email,
                password: data.password,
                extra: {
                  redirectTo: '/admin/default/',
                },
              })
            }
          />
          <Divider />
          <div className="flex gap-4">
            <Button
              block
              icon={<GoogleIcon />}
              onClick={() =>
                loginOAuth.mutate({
                  provider: 'google',
                  extra: {
                    redirectTo: '/admin/default/',
                  },
                })
              }
            />
            <Button
              block
              icon={<AppleIcon />}
              onClick={() =>
                loginOAuth.mutate({
                  provider: 'apple',
                  extra: {
                    redirectTo: '/admin/default/',
                  },
                })
              }
            />
          </div>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{' '}
            <Link href="register" className="font-semibold leading-6">
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
