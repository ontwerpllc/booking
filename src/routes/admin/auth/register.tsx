import { Button, Divider, Typography } from 'antd';
import { BrandIcon } from '~/components/brand-icon';
import { RegisterForm } from './components/register-form';
import { GoogleIcon, AppleIcon } from '~/icons';
import { useSignInWithOAuth, useSignUp } from '~/api/hooks/auth';
import { PATH } from '~/constants/paths';

const { Title, Link } = Typography;

const AdminRegister = () => {
  const signUp = useSignUp({
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

          <Title level={2} className="mt-10 text-center">
            Create your account
          </Title>
        </div>

        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <RegisterForm
            onSubmit={(data) => {
              signUp.mutate({
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                password: data.password,
              });
            }}
            isLoading={signUp.isPending}
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
            Already a member?{' '}
            <Link href="login" className="font-semibold leading-6">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default AdminRegister;
