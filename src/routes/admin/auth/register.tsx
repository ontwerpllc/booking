import { Typography } from 'antd';
import { BrandIcon } from '~/components/brand-icon';
import { RegisterForm } from './components/register-form';

const { Title, Link } = Typography;

const AdminRegister = () => {
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
            onSubmit={() => {
              // TODO: Implement
            }}
          />

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
