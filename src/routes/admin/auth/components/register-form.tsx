import { Button, Form, GlobalToken, Input, Progress, theme } from 'antd';
import { ChangeEvent, useState } from 'react';

type FieldType = {
  email?: string;
  password?: string;
  confirmPassword?: string;
  firstName?: string;
  lastName?: string;
};

type Props = {
  onSubmit: (values: FieldType) => void;
  submitText?: string;
};

const { useToken } = theme;

function determinePasswordStrength(password: string) {
  let strength = 0;
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
  return strength;
}

function determinePasswordStrengthColor(strength: number, token: GlobalToken) {
  let color = token.red;

  if (strength >= 40 && strength < 60) {
    color = token.orange;
  }
  if (strength >= 60 && strength < 100) {
    color = token.yellow;
  }
  if (strength == 100) {
    color = token.green;
  }

  return color;
}

const RegisterForm = (props: Props) => {
  const { onSubmit, submitText = 'Sign up' } = props;
  const { token } = useToken();
  const [passwordStrengthColor, setPasswordStrengthColor] = useState<string>(
    token.red,
  );
  const [passwordStrength, setPasswordStrength] = useState(0);

  const onPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    const strength = determinePasswordStrength(event.target.value);
    const color = determinePasswordStrengthColor(strength, token);
    setPasswordStrength(strength);
    setPasswordStrengthColor(color);
  };

  return (
    <Form onFinish={onSubmit} layout="vertical">
      <div className="flex gap-6">
        <Form.Item<FieldType>
          label="First Name"
          name="firstName"
          rules={[{ required: true, message: 'Please input your first name' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Last Name"
          name="lastName"
          rules={[{ required: true, message: 'Please input your last name' }]}
        >
          <Input />
        </Form.Item>
      </div>

      <Form.Item<FieldType>
        label="Email"
        name="email"
        rules={[{ required: true, message: 'Please input your email' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password' }]}
      >
        <Input.Password onChange={onPasswordChange} />
      </Form.Item>
      <Progress
        percent={passwordStrength}
        showInfo={false}
        strokeColor={passwordStrengthColor}
      />

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
          {submitText}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RegisterForm;
