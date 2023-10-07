import { Button, Form, Input, Progress, theme } from 'antd';
import Link from 'antd/es/typography/Link';
import Title from 'antd/es/typography/Title';
import { useState } from 'react';

type FieldType = {
  email?: string;
  password?: string;
  confirmPassword?: string;
};

const { useToken } = theme;

const AdminRegister = () => {
  const { token } = useToken();
  const [passwordStrengthColor, setPasswordStrengthColor] = useState<string>(
    token.red,
  );
  const [passwordStrength, setPasswordStrength] = useState(0);
  const determinePasswordStrength = (password: string) => {
    let strength = 0;
    let color = token.red;
    if (password.match(/[a-z]+/)) {
      strength += 20;
    }
    if (password.match(/[A-Z]+/)) {
      strength += 20;
    }
    if (password.match(/[0-9]+/)) {
      strength += 20;
    }
    if (password.match(/[$@#&!]+/)) {
      strength += 20;
    }
    if (password.length > 8) {
      strength += 20;
    }
    if (strength >= 40 && strength < 60) {
      color = token.orange;
    }
    if (strength >= 60 && strength < 100) {
      color = token.yellow;
    }
    if (strength == 100) {
      color = token.green;
    }
    setPasswordStrengthColor(color);
    setPasswordStrength(strength);
  };

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
            Create your account
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
              <div>
                <Input.Password
                  onChange={(event) => {
                    determinePasswordStrength(event.target.value);
                  }}
                />
                <Progress
                  percent={passwordStrength}
                  showInfo={false}
                  strokeColor={passwordStrengthColor}
                />
              </div>
            </Form.Item>

            <Form.Item<FieldType>
              label="Confirm Password"
              name="confirmPassword"
              rules={[
                { required: true, message: 'Please confirm your password' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error('The passwords that you entered do not match'),
                    );
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block className="mt-2">
                Sign up
              </Button>
            </Form.Item>
          </Form>

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
