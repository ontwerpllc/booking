import { Button, Form, Input } from 'antd';
import Link from 'antd/es/typography/Link';
import Title from 'antd/es/typography/Title';

type FieldType = {
  email?: string;
  password?: string;
};

const AdminLogin = () => {
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <Title level={2} className="mt-10 text-center">
            Sign in to your account
          </Title>
        </div>

        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Form
            initialValues={{ remember: true }}
            onFinish={() => {}}
            onFinishFailed={() => {}}
            layout="vertical"
          >
            <Form.Item<FieldType>
              label="Email"
              name="email"
              rules={[
                { required: true, message: 'Please input your username' },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item<FieldType>
              label="Password"
              name="password"
              rules={[
                { required: true, message: 'Please input your password' },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block className="mt-2">
                Sign in
              </Button>
            </Form.Item>
          </Form>

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
