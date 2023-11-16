import { BrandIcon } from '~/components/brand-icon';
import { LoginForm } from './components/login-form';
import { Typography } from 'antd';

const { Title, Link } = Typography;

const AdminLogin = () => {
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
            onSubmit={() => {
              // TODO: Implement
            }}
          />

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
